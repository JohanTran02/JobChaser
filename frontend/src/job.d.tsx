import { CookieSetOptions } from "universal-cookie";

export interface Job {
    application_deadline: string,
    application_details: {
        url: string
    },
    id: number,
    employer: {
        name: string,
        url: string
    },
    logo_url: string,
    headline: string,
    description: {
        text: string,
        text_formatted: string,
    },
    publication_date: string,
    conditions: string,
    salary_type: string,
    occupation: string,
    workplace_address: {
        municipality: string
    }
}

export interface JobSuggestions {
    found_phrase: string,
    type: string,
    value: string,
}

export type FetchStatus = "idle" | "loading" | "fulfilled" | "rejected";
export type ModalStatus = "open" | "closed";
export type Pattern = "Sign In" | "Sign Up";

export interface IFormInput {
    email: string;
    password: string;
}

function setTime() {
    const now = new Date();
    now.setTime(now.getTime() + 1 * 3600 * 1000);
    return now;
}


export const options: CookieSetOptions = {
    path: "/",
    expires: setTime(),
    httpOnly: false,
    secure: true
}