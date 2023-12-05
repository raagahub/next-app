import { useEffect, useState } from "react";

export type RequestStatus = "iddle" | "loading" | "success" | "error";

export type UrlData = {
    title: string;
    description: string | null;
    favicon: string | null;
    imageSrc: string | null;
};

export function useUnfurlUrl(url: string) {
    const [status, setStatus] = useState<RequestStatus>("iddle");
    const [data, setData] = useState<null | UrlData>(null);

    useEffect(() => {
        setStatus("loading");

        const encoded = encodeURIComponent(url);
        fetch(`/api/unfurl/${encoded}`)
            .then(async (res) => {
                if (res.ok) {
                    const data = await res.json();
                    setData(data);
                    setStatus("success");
                } else {
                    setStatus("error");
                }
            })
            .catch((error) => {
                console.error(error);
                setStatus("error");
            });
    }, [url]);

    return { status, data };
}

export const youtubeRegExp = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
export const youtubeIdRegExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;