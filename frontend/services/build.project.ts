import { API_URL } from "@/constants"
import { BuildForm } from "shared-types";

export const buildProject = async (form: BuildForm) => {
    const buildResponse = await fetch(API_URL + "/deploy/build", {
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

    return buildResponse;
}
