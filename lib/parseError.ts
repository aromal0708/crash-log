import { ParseError } from "@/types";
import { extractFileName } from "./extractFileName";
import { classifySeverity } from "./severityClassifier";
import dayjs from "dayjs";

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

    file = extractFileName(stack);
    const severity = classifySeverity(error);


    return {
        message,
        stack,
        file,
        severity,
        timestamp:dayjs().format("YYYY-MM-DD HH:mm:ss")
    }
}