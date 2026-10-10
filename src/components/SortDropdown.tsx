import type { SortKey } from "../types/github";

type SortDropdownProps = {
  value: SortKey;
  onChange: (sort: SortKey) => void;
};

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <label htmlFor="sort-select" style={{ fontWeight: 500, fontSize: "0.9rem" }}>
        Sort by:
      </label>
      <select
        id="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        style={{
          padding: "0.5rem 0.75rem",
          fontSize: "0.95rem",
          borderRadius: "0.375rem",
          border: "1px solid #ccc",
          backgroundColor: "#fff",
          cursor: "pointer",
        }}
      >
        <option value="stars">Most Stars ⭐</option>
        <option value="recent">Recently Pushed 🕒</option>
        <option value="name">Name (A-Z) 🔤</option>
      </select>
    </div>
  );
}