export type IndustryQuery = {
    limit: number;
    page: number;
    sort: string;
    order: "desc" | "asc",
    q: string;
}