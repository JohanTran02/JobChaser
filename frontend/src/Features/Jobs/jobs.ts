//TODO Fixa fetches med jobb 

export async function jobsCreateFetch(userid: string, job_id: string, token: string) {
    try {
        const response = await fetch(`http://localhost:3000/api/jobs/users?userid=${userid}&jobsid=${job_id}`, {
            method: "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        const result = await response.json();

        return result;

    } catch (error) {
        console.error("Error details:", error);
    }
}

export async function jobsDeleteFetch(userid: string, job_id: string, token: string) {
    try {
        const response = await fetch(`http://localhost:3000/api/jobs/users?userid=${userid}&jobsid=${job_id}`, {
            method: "DELETE",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        const result = await response.json();

        return result;

    } catch (error) {
        console.error("Error details:", error);
    }
}