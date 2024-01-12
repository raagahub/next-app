import { Grid } from "@mantine/core"
import { SubmitMusicForm } from "./SubmitMusicForm/SubmitMusicForm"
import { useUnfurlUrl, youtubeIdRegExp, youtubeRegExp } from "../../helpers/UrlHelpers";
import { isNotEmpty, useForm, UseFormReturnType } from "@mantine/form";
import { createContext, useEffect, useState } from "react";
import { Artist, defaultArtiste } from "../../helpers/ArtistHelpers";
import { Raga, defaultRaga } from "../../helpers/RagaHelpers";
import { Tala, defaultTala } from "../../helpers/TalaHelpers";
import { SubmitMusicPreview } from "./SubmitMusicPreview";
import { useDebouncedValue } from "@mantine/hooks";
import { databaseErrorNotification } from "../../helpers/NotificationHelpers";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

interface FormValues {
    youtubeLink: string;
    youtubeId: string;
    title: string;
    image: string;
    format: string;
    compId: string;
    ragaId: string;
    talaId: string;
    composerId: string;
    mainArtist: Artist;
    accompanying: Artist[];
    moods: string[];
    newComp: boolean;
}

export const SubmitMusicContext = createContext<UseFormReturnType<FormValues>>({} as UseFormReturnType<FormValues>);

export const SubmitMusicComponent = () => {
    const supabase = useSupabaseClient()
    const form = useForm({
        initialValues: {
            youtubeLink: '',
            youtubeId: '',
            title: '',
            image: '',
            format: '',
            compId: '',
            ragaId: '',
            talaId: '', 
            composerId: '',
            mainArtist: defaultArtiste,
            accompanying: [defaultArtiste],
            moods: [''],
            newComp: false
        },

        validate: {
            youtubeLink: (value) => (youtubeRegExp.test(value) ? null : 'Invalid Youtube Link'),
            title: isNotEmpty('Title cannot be empty'),
        },
    });

    function getVideoId(url: string) {
        const match = url.match(youtubeIdRegExp);
        console.log("getIdregex", match)
        return (match && match[7].length === 11)
            ? match[7]
            : null;
    }


    const [linkValidation, setValidation] = useState({loading: false, status: '', msg: ''});

    async function validateYTLink(url: string) {
        setValidation({...linkValidation, loading: true})
        const { data, count, status, error } = await supabase
            .from('music_videos')
            .select('*', { count: 'exact' })
            .eq('youtube_video_id', getVideoId(url))

        if (status == 200 && count && count > 0) {
            // TODO: Add way to access existing video
            console.log("validation result", data)
            setValidation({loading: false, status: 'error', msg: 'This video has been submitted.'})
        } else {
            if (error) {
                databaseErrorNotification(error)
            } else {
                setValidation({loading: false, status: 'success', msg: 'Your submission link looks good! Provide more details to make it better.'})
                form.setFieldValue('youtubeId', getVideoId(url) as string)
            }
        }
    }

    const [debouncedYTLink] = useDebouncedValue(form.values.youtubeLink, 200);
    const { status: unfurlStatus, data: unfurlData } = useUnfurlUrl(debouncedYTLink);

    useEffect(() => {
        if (form.isValid('youtubeLink')) {
            validateYTLink(debouncedYTLink)
        } else {
            setValidation({loading: false, status: 'error', msg: 'Please use a valid Youtube URL'})
        }

        if (unfurlStatus === 'success') {
            form.setValues({
                title: unfurlData?.title,
                image: unfurlData?.imageSrc || ''
            });
        }

    }, [debouncedYTLink, unfurlData, unfurlStatus]);

    return (
        <div>
            <SubmitMusicContext.Provider value={form}>
                <Grid>
                    <Grid.Col span={8}>
                        <SubmitMusicForm linkValidation={linkValidation}/>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <SubmitMusicPreview/>
                    </Grid.Col>
                </Grid>
            </SubmitMusicContext.Provider>
        </div>
    )
}
