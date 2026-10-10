export type  Repo = {
id: number;
name: string;
description: string | null;
html_url: string;
stargazers_count: number;
language: string |null;
pushed_at: string;
};
export type SortKey = "stars" | "recent" | "name";
export type FetchStatus = "idle" | "loading" | "error" | "ready" ;