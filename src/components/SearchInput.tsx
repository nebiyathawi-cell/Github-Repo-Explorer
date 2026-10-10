import { useState,  type FormEvent } from "react";

export type SearchInputProps = {
  value: string;
  onSearch: (username: string) => void;
};

export function SearchInput({ value, onSearch }: SearchInputProps) {
  const [inputValue, setInputValue] = useState(value);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(inputValue.trim());
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem", flex: 1 }}>
      <input
        type="text"
        placeholder="Enter GitHub username (e.g., torvalds)"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{
          flex: 1,
          padding: "0.5rem 0.75rem",
          fontSize: "1rem",
          borderRadius: "0.375rem",
          border: "1px solid #ccc",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          backgroundColor: "#24292e",
          color: "#fff",
          border: "none",
          borderRadius: "0.375rem",
          cursor: "pointer",
        }}
      >
        Search
      </button>
    </form>
  );
}