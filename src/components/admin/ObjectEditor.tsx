"use client";

import { Plus, Trash2 } from "lucide-react";

function isImageField(key: string): boolean {
  return /image|logo|thumbnail|hero|avatar|favicon/i.test(key) && !/embed/i.test(key);
}

function isLongText(key: string, value: string): boolean {
  return (
    value.length > 80 ||
    /desc|content|paragraph|subtitle|message|intro|body|excerpt|bio|quote/i.test(key)
  );
}

function FieldEditor({
  label,
  value,
  onChange,
}: {
  label: string;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
        {label}
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <div className="mb-3">
        <label className="block text-xs font-medium capitalize text-slate-600">
          {label.replace(/([A-Z])/g, " $1")}
        </label>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>
    );
  }

  if (typeof value === "string") {
    if (isImageField(label)) {
      return (
        <div className="mb-3">
          <label className="block text-xs font-medium capitalize text-slate-600">
            {label.replace(/([A-Z])/g, " $1")} (URL)
          </label>
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://..."
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
          {value && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="mt-2 h-16 rounded border object-cover" />
          )}
        </div>
      );
    }
    if (isLongText(label, value)) {
      return (
        <div className="mb-3">
          <label className="block text-xs font-medium capitalize text-slate-600">
            {label.replace(/([A-Z])/g, " $1")}
          </label>
          <textarea
            rows={4}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
      );
    }
    return (
      <div className="mb-3">
        <label className="block text-xs font-medium capitalize text-slate-600">
          {label.replace(/([A-Z])/g, " $1")}
        </label>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>
    );
  }

  return null;
}

function ArrayEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: unknown[];
  onChange: (items: unknown[]) => void;
}) {
  const addItem = () => {
    const template = items[0];
    if (template && typeof template === "object" && template !== null) {
      const blank = Object.fromEntries(
        Object.entries(template as Record<string, unknown>).map(([k, v]) => [
          k,
          typeof v === "number" ? 0 : typeof v === "boolean" ? false : "",
        ])
      );
      onChange([...items, { ...blank, id: `new-${Date.now()}` }]);
    } else {
      onChange([...items, ""]);
    }
  };

  return (
    <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="font-semibold capitalize text-slate-800">
          {label.replace(/([A-Z])/g, " $1")} ({items.length})
        </h4>
        <button
          type="button"
          onClick={addItem}
          className="inline-flex items-center gap-1 rounded-md bg-teal-700 px-2 py-1 text-xs font-medium text-white hover:bg-teal-800"
        >
          <Plus className="h-3 w-3" /> Add
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="rounded-lg border border-slate-200 bg-white p-3">
            <div className="mb-2 flex justify-end">
              <button
                type="button"
                onClick={() => onChange(items.filter((_, j) => j !== i))}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            {typeof item === "string" || typeof item === "number" ? (
              <FieldEditor
                label={`Item ${i + 1}`}
                value={item}
                onChange={(v) => {
                  const next = [...items];
                  next[i] = v;
                  onChange(next);
                }}
              />
            ) : item && typeof item === "object" ? (
              <ObjectEditor
                data={item as Record<string, unknown>}
                onChange={(v) => {
                  const next = [...items];
                  next[i] = v;
                  onChange(next);
                }}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ObjectEditor({
  data,
  onChange,
}: {
  data: Record<string, unknown>;
  onChange: (d: Record<string, unknown>) => void;
}) {
  const updateKey = (key: string, val: unknown) => {
    onChange({ ...data, [key]: val });
  };

  return (
    <div className="space-y-1">
      {Object.entries(data).map(([key, value]) => {
        if (Array.isArray(value)) {
          return (
            <ArrayEditor
              key={key}
              label={key}
              items={value}
              onChange={(items) => updateKey(key, items)}
            />
          );
        }

        if (value && typeof value === "object") {
          return (
            <div key={key} className="mb-3 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <h4 className="mb-3 font-semibold capitalize text-slate-800">
                {key.replace(/([A-Z])/g, " $1")}
              </h4>
              <ObjectEditor
                data={value as Record<string, unknown>}
                onChange={(v) => updateKey(key, v)}
              />
            </div>
          );
        }

        return (
          <FieldEditor
            key={key}
            label={key}
            value={value}
            onChange={(v) => updateKey(key, v)}
          />
        );
      })}
    </div>
  );
}
