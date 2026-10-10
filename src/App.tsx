import { useState } from "react";
import type { SortKey } from "./types/github";
import { SearchInput} from "./components/SearchInput";
import { SortDropdown} from "./components/SortDropdown";
import { RepoList} from "./components/RepoList";

export default function App() {
const [username, setUsername]= useState<string>("");
const [sort,setSort]= useState<SortKey>("stars");
return (
<div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 1rem" }}>
<header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.875rem", fontWeight: "bold" }}>
          GitHub Repo Explorer
        </h1>
        <p style={{ color: "#666" }}>
          Search for a GitHub user to inspect public repositories.
        </p>
      </header>

      {/* Control bar */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        <SearchInput
          value={username}
          onSearch={(query) => setUsername(query)}
        />
        <SortDropdown
          value={sort}
          onChange={(newSort) => setSort(newSort)}
        />
      </div>

      {/* Main Content Area */}
      <main>
        <RepoList username={username} sort={sort} />
      </main>
    </div>
  );
}