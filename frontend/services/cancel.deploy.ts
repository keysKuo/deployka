import { API_URL } from "@/constants";
import { CancelForm, CancelResponse } from "shared-types";

export const cancelDeploy = async (form: CancelForm): Promise<CancelResponse | null | undefined> => {
    const cancelResponse = await fetch(API_URL + "/deploy/cancel", {
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

    return cancelResponse;
}
