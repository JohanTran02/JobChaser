import { IFormInput } from "../../job.d";

export async function signUpFetch(data: IFormInput) {
    try {
        const response = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        return result;

    } catch (error) {
        console.error("Error details:", error);
    }
}