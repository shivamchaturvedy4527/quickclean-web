"use client";

import { useState } from "react";

export function JsonEditor({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const [text, setText] = useState(() => JSON.stringify(value, null, 2));
  const [error, setError] = useState("");

  function apply() {
    try {
      const parsed = JSON.parse(text) as unknown;
      setError("");
      onChange(parsed);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-600">
        Edit the entire website database as JSON. Every field on every page lives here. Use this when a specific tab does not show a field you need. Click <strong>Save Changes</strong> after Apply.
      </p>
      {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        className="min-h-[60vh] w-full rounded-lg border border-slate-300 p-4 font-mono text-xs leading-relaxed"
      />
      <button
        type="button"
        onClick={apply}
        className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        Apply JSON to editor (then click Save Changes)
      </button>
    </div>
  );
}
