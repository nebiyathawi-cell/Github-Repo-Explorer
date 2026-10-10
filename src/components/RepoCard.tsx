import type { Repo } from "../types/github";

type RepoCardProps = {
  repo: Repo;
};

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <div
      style={{
        border: "1px solid #e1e4e8",
        borderRadius: "0.5rem",
        padding: "1rem",
        backgroundColor: "#dfd4d4",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "1.125rem",
            fontWeight: 600,
            color: "#0366d6",
            textDecoration: "none",
          }}
        >
          {repo.name}
        </a>
        <span style={{ fontSize: "0.875rem", color: "#2d74c4" }}>
          ⭐ {repo.stargazers_count.toLocaleString()}
        </span>
      </div>

      <p
        style={{
          color: "#586069",
          fontSize: "0.875rem",
          margin: "0.5rem 0 1rem 0",
        }}
      >
        {repo.description || "No description provided."}
      </p>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          fontSize: "0.75rem",
          color: "#586069",
        }}
      >
        {repo.language && (
          <span>
            <strong style={{ color: "#24292e" }}>Language:</strong>{" "}
            {repo.language}
          </span>
        )}
        <span>
          <strong style={{ color: "#24292e" }}>Pushed:</strong>{" "}
          {new Date(repo.pushed_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
