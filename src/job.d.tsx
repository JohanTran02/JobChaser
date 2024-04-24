export interface Job {
    id?: number,
    company: string,
    logo: string,
    position: string,
    role?: string,
    level?: string,
    postedAt: string,
    contract: string,
    location: string,
    languages?: string[],
    tools: string[]
}

export interface JobTest {
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