import { Pattern } from "../../job.d"

interface ErrorObject {
    required: string,
    maxLength: {
        value: number,
        message: string,
    },
    minLength: {
        value: number,
        message: string,
    },
    pattern: {
        value: RegExp,
        message: string
    }
}

export const optionPatterns = (property: string, pattern: Pattern) => {
    const errorObject: Partial<ErrorObject> = {
        required: `${property} is required.`
    }

    if (property === 'email') {
        errorObject.pattern = {
            value: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
            message: `Invalid ${property} address.`
        }
    }

    if (pattern.includes("Sign Up")) {
        if (property === 'password') {
            errorObject.pattern = {
                value: /^(?=.*[A-Z])(?=.*\d).+$/,
                message: `The ${property} is required to contain atleast a capital letter and a number.`
            }
            errorObject.minLength = {
                value: 6,
                message: `The ${property} needs to contain atleast 6 symbols.`
            }
        }

        // if (property === 'name') {
        //     errorObject.pattern = {
        //         value: /^[a-zA-ZåäöÅÄÖ\s]{2,}$/,
        //         message: `The ${property} needs to contain atleast 2 symbols.`
        //     }
        // }
    }

    return errorObject;
}