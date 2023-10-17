import { Token } from "./Token";

export const ApiJsonHeader = {
    'Content-Type': 'application/json',
    Accept: "application/json",
    Authorization: `Bearer ${Token}`
}