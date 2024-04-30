export interface Job {
    application_deadline: string,
    application_details: {
        url: string
    },
    id: number,
    employer: {
        name: string,
    },
    logo_url: string,
    headline: string,
    description: {
        text: string,
        text_formatted: string,
    },
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
