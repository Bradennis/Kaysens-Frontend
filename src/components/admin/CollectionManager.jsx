import { useCallback, useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Search } from "lucide-react";
import {
  TextField,
  TextAreaField,
  CheckboxField,
  SelectField,
  TagsField,
  ImageField,
  RepeaterField,
  DateField,
} from "./FormFields";
import { PageLoader, PageError, EmptyState } from "../Feedback";

function getDefaultValue(field) {
  if (field.type === "checkbox") return field.default ?? true;
  if (field.type === "tags" || field.type === "repeater") return [];
  if (field.type === "number") return field.default ?? 0;
  return field.default ?? "";
}

function buildEmptyItem(fields) {
  return Object.fromEntries(fields.map((f) => [f.name, getDefaultValue(f)]));
}

export default function CollectionManager({ title, description, resource, fields, columns, hasSlug = true }) {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null); // null = list view, {} = new, object = edit
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await resource.listAdmin(query ? `q=${encodeURIComponent(query)}` : "");
      setItems(res.data);
    } catch (err) {
      setError(err.message || "Failed to load items");
    } finally {
      setLoading(false);
    }
  }, [resource, query]);

  useEffect(() => {
    load();
  }, [load]);

  const startCreate = () => {
    setFormData(buildEmptyItem(fields));
    setEditing({});
    setSaveError("");
  };

  const startEdit = (item) => {
    const data = Object.fromEntries(fields.map((f) => [f.name, item[f.name] ?? getDefaultValue(f)]));
    setFormData(data);
    setEditing(item);
    setSaveError("");
  };

  const cancelEdit = () => {
    setEditing(null);
    setSaveError("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError("");
    try {
      if (editing && editing._id) {
        await resource.update(editing._id, formData);
      } else {
        await resource.create(formData);
      }
      setEditing(null);
      await load();
    } catch (err) {
      setSaveError(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    const label = item.name || item.title || item.label || "this item";
    if (!window.confirm(`Delete ${label}? This cannot be undone.`)) return;
    try {
      await resource.remove(item._id);
      await load();
    } catch (err) {
      alert(err.message || "Failed to delete item");
    }
  };

  const setField = (name, value) => setFormData((f) => ({ ...f, [name]: value }));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-forest">{title}</h1>
          {description && <p className="text-sm text-forest/60 mt-1">{description}</p>}
        </div>
        {!editing && (
          <button
            onClick={startCreate}
            className="inline-flex items-center gap-2 bg-forest text-cream px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-emerald transition"
          >
            <Plus size={16} /> Add new
          </button>
        )}
      </div>

      {editing ? (
        <form onSubmit={handleSave} className="bg-white rounded-2xl ring-1 ring-forest/10 p-6 space-y-5 max-w-3xl">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-forest">{editing._id ? "Edit item" : "New item"}</h2>
            <button type="button" onClick={cancelEdit} className="text-forest/40 hover:text-forest">
              <X size={18} />
            </button>
          </div>

          {saveError && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{saveError}</div>}

          <div className="grid gap-5 md:grid-cols-2">
            {fields.map((field) => {
              const wide = ["textarea", "repeater", "tags"].includes(field.type);
              return (
                <div key={field.name} className={wide ? "md:col-span-2" : ""}>
                  {renderField(field, formData[field.name], (v) => setField(field.name, v))}
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-forest text-cream px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-emerald transition disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save"}
            </button>
            <button type="button" onClick={cancelEdit} className="text-sm font-medium text-forest/60 hover:text-forest">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="mb-4 max-w-sm relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-forest/30" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="w-full pl-9 pr-3 py-2.5 rounded-full bg-white ring-1 ring-forest/10 text-sm focus:outline-none focus:ring-2 focus:ring-emerald"
            />
          </div>

          {loading ? (
            <PageLoader label="Loading…" />
          ) : error ? (
            <PageError message={error} onRetry={load} />
          ) : !items?.length ? (
            <EmptyState message="No items yet. Click 'Add new' to create one." />
          ) : (
            <div className="bg-white rounded-2xl ring-1 ring-forest/10 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/60 text-forest/60 text-xs uppercase tracking-wider">
                  <tr>
                    {columns.map((col) => (
                      <th key={col.key} className="text-left px-4 py-3 font-semibold">
                        {col.label}
                      </th>
                    ))}
                    <th className="text-right px-4 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-forest/5">
                  {items.map((item) => (
                    <tr key={item._id} className="hover:bg-muted/30">
                      {columns.map((col) => (
                        <td key={col.key} className="px-4 py-3 align-top text-forest/80">
                          {col.render ? col.render(item) : String(item[col.key] ?? "")}
                        </td>
                      ))}
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <button
                          onClick={() => startEdit(item)}
                          className="inline-flex items-center gap-1 text-emerald hover:text-forest text-xs font-semibold mr-4"
                        >
                          <Pencil size={14} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="inline-flex items-center gap-1 text-destructive/80 hover:text-destructive text-xs font-semibold"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function renderField(field, value, onChange) {
  switch (field.type) {
    case "textarea":
      return <TextAreaField label={field.label} value={value} onChange={onChange} required={field.required} />;
    case "checkbox":
      return <CheckboxField label={field.label} checked={value} onChange={onChange} />;
    case "select":
      return <SelectField label={field.label} value={value} onChange={onChange} options={field.options} required={field.required} />;
    case "tags":
      return <TagsField label={field.label} value={value} onChange={onChange} placeholder={field.placeholder} />;
    case "image":
      return <ImageField label={field.label} value={value} onChange={onChange} required={field.required} />;
    case "repeater":
      return <RepeaterField label={field.label} value={value} onChange={onChange} subfields={field.subfields} />;
    case "number":
      return <TextField label={field.label} value={value} onChange={(v) => onChange(Number(v))} type="number" required={field.required} />;
    case "date":
      return <DateField label={field.label} value={value} onChange={onChange} required={field.required} />;
    default:
      return <TextField label={field.label} value={value} onChange={onChange} required={field.required} placeholder={field.placeholder} />;
  }
}
