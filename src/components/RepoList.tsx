import { useEffect, useState } from "react";
import type { FetchStatus, Repo, SortKey } from "../types/github";
import { RepoCard } from "./RepoCard";

type RepoListProps = {
  username: string;
  sort: SortKey;
};

export function RepoList({ username, sort }: RepoListProps) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [status, setStatus] = useState<FetchStatus>("idle");

  useEffect(() => {
    // 1. Guard against empty query
    if (!username.trim()) {
      setStatus("idle");
      setRepos([]);
      return;
    }

    // 2. AbortController for cleaning up stale requests
    const controller = new AbortController();
    setStatus("loading");

    fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      signal: controller.signal,
    })
      .then((res) => {
        // 3. Explicit check for HTTP errors (e.g. 404 User Not Found)
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data: Repo[]) => {
        console.log("Repositories received:", data);
        setRepos(data);
        setStatus("ready");
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        console.error("GitHub API request failed:", err);
        setStatus("error");
      });
    // 4. Cleanup function cancels request if username changes before fetch finishes
    return () => {
      controller.abort();
    };
  }, [username]);

  const sortedRepos = [...repos].sort((a, b) => {
    if (sort === "stars") {
      return b.stargazers_count; - a.stargazers_count;
    }
    if (sort === "recent") {
      return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
    }
    if (sort === "name") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  // Render UI according to status
  if (status === "idle") {
    return (
      <p style={{ color: "#666" }}>
        Enter a username above to search for repositories.
      </p>
    );
  }

  if (status === "loading") {
    return (
      <p style={{ color: "#666" }}>Fetching repositories for "{username}"…</p>
    );
  }

  if (status === "error") {
    return (
      <p style={{ color: "#d73a49", fontWeight: 500 }}>
        Failed to fetch repositories. Please check the username and try again.
      </p>
    );
  }

  if (status === "ready" && sortedRepos.length === 0) {
    return (
      <p style={{ color: "#666" }}>
        No public repositories found for "{username}".
      </p>
    );
  }

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      {sortedRepos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
}
