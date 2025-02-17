import { API_URL } from "@/constants";

import { UploadResponse, UploadForm } from 'shared-types';

export const uploadRepository = async (form: UploadForm): Promise<UploadResponse | null | undefined> => {
    const uploadResponse = await fetch(API_URL + "/deploy/upload", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form),
        cache: 'no-store'
    })
    .then(response => response.json())
    .then(result => result.metadata)
    .catch(err => console.log(err))

    return uploadResponse;
}
