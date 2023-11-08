import type { SearchItemType } from "./dummyData";

export const sortYears = (results: SearchItemType[]) => {
    const years: number[] = [];
    results.forEach(result => {
        const year = Number(result.releaseDate.split(" ")[2]);
        if (!years.includes(year)) {
            years.push(year);
        }
    });
    return years.sort((a, b) => b - a);
}