import { useContext } from "react"
import { SubmitMusicContext } from "./SubmitMusicComponent"
import { Image } from "@mantine/core"

export const SubmitMusicPreview = () => {
    const form = useContext(SubmitMusicContext)
    console.log(form.values)

    return (
        <div>
            <Image src={form.values.image}/>
            <p>{form.values.title}</p>
            <p>{form.values.youtubeLink}</p>
            <p>{form.values.ragaId}</p>
            <p>{form.values.talaId}</p>
            <p>{form.values.moods}</p>

        </div>
    )
}
