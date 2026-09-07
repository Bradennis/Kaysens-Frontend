import { useRef, useState } from "react";
import { Plus, Trash2, UploadCloud, Loader2 } from "lucide-react";
import { uploadApi } from "../../api/resources";
import { resolveImageUrl } from "../../api/client";

const inputClass =
  "mt-1.5 w-full px-3.5 py-2.5 rounded-lg bg-white border border-forest/15 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-emerald";

export function FieldLabel({ label, required }) {
  return (
    <label className="text-sm font-medium text-forest">
      {label} {required && <span className="text-destructive">*</span>}
    </label>
  );
}

export function TextField({ label, value, onChange, required, placeholder, type = "text" }) {
  return (
    <div>
      <FieldLabel label={label} required={required} />
      <input
        type={type}
        value={value ?? ""}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </div>
  );
}

export function DateField({ label, value, onChange, required }) {
  const dateValue = value ? new Date(value).toISOString().slice(0, 10) : "";
  return (
    <div>
      <FieldLabel label={label} required={required} />
      <input
        type="date"
        value={dateValue}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </div>
  );
}

export function TextAreaField({ label, value, onChange, required, rows = 4 }) {
  return (
    <div>
      <FieldLabel label={label} required={required} />
      <textarea
        value={value ?? ""}
        required={required}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </div>
  );
}

export function CheckboxField({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium text-forest">
      <input
        type="checkbox"
        checked={!!checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-4 rounded border-forest/30 text-emerald focus:ring-emerald"
      />
      {label}
    </label>
  );
}

export function SelectField({ label, value, onChange, options, required }) {
  return (
    <div>
      <FieldLabel label={label} required={required} />
      <select value={value ?? ""} onChange={(e) => onChange(e.target.value)} className={inputClass}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function TagsField({ label, value, onChange, placeholder }) {
  const text = Array.isArray(value) ? value.join(", ") : "";
  return (
    <div>
      <FieldLabel label={label} />
      <input
        type="text"
        value={text}
        placeholder={placeholder || "Comma-separated values"}
        onChange={(e) =>
          onChange(
            e.target.value
              .split(",")
              .map((v) => v.trim())
              .filter(Boolean),
          )
        }
        className={inputClass}
      />
      <p className="mt-1 text-xs text-forest/40">Separate each value with a comma.</p>
    </div>
  );
}

export function ImageField({ label, value, onChange, required }) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
    try {
      const res = await uploadApi.image(file);
      onChange(res.data.url);
    } catch (err) {
      setUploadError(err.message || "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <FieldLabel label={label} required={required} />
      <div className="mt-1.5 flex items-start gap-4">
        <div className="size-24 rounded-lg overflow-hidden bg-muted ring-1 ring-forest/10 flex items-center justify-center shrink-0">
          {value ? (
            <img src={resolveImageUrl(value)} alt="" className="w-full h-full object-cover" />
          ) : (
            <UploadCloud size={20} className="text-forest/30" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input
            type="text"
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/uploads/example.jpg or https://…"
            className={inputClass + " mt-0"}
          />
          <label className="inline-flex items-center gap-2 text-xs font-semibold text-emerald cursor-pointer hover:text-forest">
            {uploading ? <Loader2 size={14} className="animate-spin" /> : <UploadCloud size={14} />}
            {uploading ? "Uploading…" : "Upload an image"}
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </label>
          {uploadError && <p className="text-xs text-destructive">{uploadError}</p>}
        </div>
      </div>
    </div>
  );
}

// A repeatable list of small objects, e.g. [{ title, desc }] or [{ name, desc, image }].
// `subfields` describes each column: { name, label, type: 'text' | 'textarea' | 'image' }
export function RepeaterField({ label, value, onChange, subfields }) {
  const rows = Array.isArray(value) ? value : [];

  const updateRow = (index, key, val) => {
    const next = rows.map((row, i) => (i === index ? { ...row, [key]: val } : row));
    onChange(next);
  };

  const addRow = () => {
    const blank = Object.fromEntries(subfields.map((f) => [f.name, ""]));
    onChange([...rows, blank]);
  };

  const removeRow = (index) => {
    onChange(rows.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <FieldLabel label={label} />
        <button
          type="button"
          onClick={addRow}
          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald hover:text-forest"
        >
          <Plus size={14} /> Add item
        </button>
      </div>

      <div className="mt-2 space-y-3">
        {rows.length === 0 && <p className="text-xs text-forest/40">No items yet — click "Add item".</p>}
        {rows.map((row, index) => (
          <div key={index} className="rounded-lg border border-forest/10 bg-white p-3 relative">
            <button
              type="button"
              onClick={() => removeRow(index)}
              className="absolute top-2 right-2 text-forest/30 hover:text-destructive"
              aria-label="Remove item"
            >
              <Trash2 size={14} />
            </button>
            <div className="grid gap-2 pr-6" style={{ gridTemplateColumns: `repeat(${Math.min(subfields.length, 2)}, 1fr)` }}>
              {subfields.map((f) =>
                f.type === "image" ? (
                  <div key={f.name} className="col-span-full">
                    <ImageField label={f.label} value={row[f.name]} onChange={(v) => updateRow(index, f.name, v)} />
                  </div>
                ) : f.type === "textarea" ? (
                  <div key={f.name} className="col-span-full">
                    <TextAreaField label={f.label} value={row[f.name]} onChange={(v) => updateRow(index, f.name, v)} rows={2} />
                  </div>
                ) : (
                  <TextField key={f.name} label={f.label} value={row[f.name]} onChange={(v) => updateRow(index, f.name, v)} />
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
