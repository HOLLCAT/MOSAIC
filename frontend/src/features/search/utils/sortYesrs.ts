import type { SearchResultType } from "./types";

export const sortYears = (results: SearchResultType []) => {
    const years: number[] = [];
    results.forEach(result => {
        const year = Number(result.created_date.split(" ")[2]);
        if (!years.includes(year)) {
            years.push(year);
        }
    });
    return years.sort((a, b) => b - a);
}