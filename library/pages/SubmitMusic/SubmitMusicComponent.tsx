import { Grid } from "@mantine/core"
import { SubmitMusicForm } from "./SubmitMusicForm/SubmitMusicForm"
import { useUnfurlUrl, youtubeIdRegExp, youtubeRegExp } from "../../helpers/UrlHelpers";
import { isNotEmpty, useForm, UseFormReturnType } from "@mantine/form";
import { createContext, useEffect, useState } from "react";
import { Artist, SubmissionArtist, defaultArtist, getArtist } from "../../helpers/ArtistHelpers";
import { Raga, defaultRaga, getRaga } from "../../helpers/RagaHelpers";
import { Tala, defaultTala, getTala } from "../../helpers/TalaHelpers";
import { SubmitMusicPreview } from "./SubmitMusicPreview";
import { useDebouncedValue } from "@mantine/hooks";
import { databaseErrorNotification } from "../../helpers/NotificationHelpers";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { getComposer, getComposition } from "../../helpers/CompositionHelpers";

interface FormValues {
    youtubeLink: string;
    youtubeId: string;
    title: string;
    image: string;
    format: string;
    compId: string;
    compName: string;
    ragaId: string;
    ragaName: string;
    talaId: string;
    talaName: string;
    composerId: string;
    composerName: string;
    mainArtist: SubmissionArtist;
    accompanying: SubmissionArtist[];
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
            compName: '',
            ragaId: '',
            ragaName: '',
            talaId: '', 
            talaName: '',
            composerId: '',
            composerName: '',
            mainArtist: defaultArtist('main'),
            accompanying: [defaultArtist('accompanying')],
            moods: [''],
            newComp: false,
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

    // Form Related Effects

    useEffect(() => {
        (async () => {
            const composition = await getComposition(form.values.compId, supabase)
            form.setFieldValue('ragaId', composition.raga)
            form.setFieldValue('talaId', composition.tala)
            form.setFieldValue('composerId', composition.composer)
            form.setFieldValue('compName', composition.title)
        })();

    }, [form.values.compId])

    useEffect(() => {
        (async () => {
            const raga = await getRaga(form.values.ragaId, supabase)
            form.setFieldValue('ragaName', raga.format_name)
        })();

    }, [form.values.ragaId])

    useEffect(() => {
        (async () => {
            const tala = await getTala(form.values.talaId, supabase)
            form.setFieldValue('talaName', tala.name)
        })();

    }, [form.values.talaId])

    useEffect(() => {
        (async () => {
            const composer = await getComposer(form.values.composerId, supabase)
            form.setFieldValue('composerName', composer.name)
        })();

    }, [form.values.composerId])

    useEffect(() => {
        (async () => {
            const artist = await getArtist(form.values.mainArtist.artist_id, supabase)
            form.setFieldValue('mainArtist.artists.name', artist.name)
        })();

    }, [form.values.mainArtist])

    useEffect(() => {
        form.values.accompanying.forEach(async (accompanying, index)=> {
            const artist = await getArtist(accompanying.artist_id, supabase)
            form.setFieldValue(`accompanying.${index}.artists.name`, artist.name)
        })

    }, [form.values.accompanying])

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
