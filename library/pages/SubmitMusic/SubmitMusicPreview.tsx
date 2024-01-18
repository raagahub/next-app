import { useContext, useEffect, useState } from "react"
import { SubmitMusicContext } from "./SubmitMusicComponent"
import { AspectRatio, Badge, Box, Card, Group, Image, Text } from "@mantine/core"
import useStyles from "./SubmitMusic.styles"
import { Submission } from "../../helpers/SubmissionHelpers"
import { SubmissionPreview } from "../../components/music_components/SubmissionPreview/SubmissionPreview"

export const SubmitMusicPreview = () => {
    const form = useContext(SubmitMusicContext)
    const { classes } = useStyles()
    const [submission, setSubmission] = useState<Submission|null>(null)

    useEffect(() => {
        const submission: Submission = {
            id: 0,
            user_id: 'string',
            status: 'draft',
            notes: '',
            approved_video_id: '',
            composer_id: Number(form.values.composerId),
            composition_title: form.values.compName,
            moods: form.values.moods,
            format: form.values.format,
            youtube_url: form.values.youtubeLink,
            youtube_video_id: form.values.youtubeId,
            title: form.values.title,
            image: form.values.image,
            composition_id: Number(form.values.compId),
            new_composition: form.values.newComp,
            raga_id: Number(form.values.ragaId),
            tala_id: Number(form.values.talaId),
            ragas: { format_name: form.values.ragaName },
            talas: { name: form.values.talaName},
            composers: { name: form.values.composerName },
            compositions: { title: form.values.compName },
            submission_artists: [form.values.mainArtist, ...form.values.accompanying],
            submission_pending_artists: [],
            submitted_at: '',
        }
        setSubmission(submission)
    },[form])


    return (
        <div className={classes.previewContainer}>
            <SubmissionPreview submission={submission}/>
        </div>
    )
}
