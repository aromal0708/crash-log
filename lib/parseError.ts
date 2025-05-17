//File to parse error objects and extract relevant information


// Importing necessary modules
import { ParseError } from "@/types";
import { extractFileName } from "./extractFileName";
import { classifySeverity } from "./severityClassifier";
import dayjs from "dayjs";

// Function to parse an error object and extract relevant information
// This function takes an error object and returns a ParseError object
export const parseError = (error:any):ParseError =>{
    let message = "unknown error";
    let stack = "";
    let file = undefined

    if (typeof error === "string"){
        message = error;
    }else if (error instanceof Error){
        message = error.message;
        stack = error.stack || "";
    }else if (error && typeof error === "object"){
        message = error.message ||JSON.stringify(error);
        stack = error.stack||"";
    }

    //Extract file name and severity from the stack trace
    // If the stack trace is not available, set file to "unknown"
    file = extractFileName(stack);
    const severity = classifySeverity(error);


    //Returns a parsed error object
    return {
        message,
        stack,
        file,
        severity,
        timestamp:dayjs().format("YYYY-MM-DD HH:mm:ss")
    }
}