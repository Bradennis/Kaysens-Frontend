import { useCallback, useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { settingsApi } from "../../api/resources";
import { PageLoader, PageError } from "../../components/Feedback";
import { TextField, TextAreaField, TagsField } from "../../components/admin/FormFields";

export default function SettingsAdmin() {
  const fetcher = useCallback(() => settingsApi.get(), []);
  const { data: settings, loading, error } = useFetch(fetcher, []);
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (settings) setForm(settings);
  }, [settings]);

  if (loading || !form) return <PageLoader label="Loading settings…" />;
  if (error) return <PageError message={error} />;

  const setField = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
    setSaved(false);
  };

  const setSocial = (name, value) => {
    setForm((f) => ({ ...f, social: { ...f.social, [name]: value } }));
    setSaved(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError("");
    try {
      const res = await settingsApi.update(form);
      setForm(res.data);
      setSaved(true);
    } catch (err) {
      setSaveError(err.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold text-forest">Site Settings</h1>
      <p className="text-sm text-forest/60 mt-1">
        Global information shown in the site header, footer and contact page.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 bg-white rounded-2xl ring-1 ring-forest/10 p-6 space-y-6">
        {saveError && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{saveError}</div>}
        {saved && <div className="p-3 rounded-lg bg-emerald/10 text-emerald text-sm">Settings saved.</div>}

        <div className="grid md:grid-cols-2 gap-5">
          <TextField label="Site name" value={form.siteName} onChange={(v) => setField("siteName", v)} required />
          <TextField label="Tagline" value={form.tagline} onChange={(v) => setField("tagline", v)} />
        </div>

        <TextAreaField
          label="Meta description (SEO)"
          value={form.metaDescription}
          onChange={(v) => setField("metaDescription", v)}
          rows={2}
        />

        <TextField label="Footer tagline" value={form.footerTagline} onChange={(v) => setField("footerTagline", v)} />

        <div className="grid md:grid-cols-2 gap-5">
          <TextField label="Address" value={form.address} onChange={(v) => setField("address", v)} required />
          <TextField label="City / Country" value={form.city} onChange={(v) => setField("city", v)} required />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <TextField label="Phone" value={form.phone} onChange={(v) => setField("phone", v)} required />
          <TextField label="Email" value={form.email} onChange={(v) => setField("email", v)} type="email" required />
        </div>

        <TextField label="Press email" value={form.pressEmail} onChange={(v) => setField("pressEmail", v)} type="email" />

        <TagsField
          label="Working hours (one entry per line item, comma-separated)"
          value={form.workingHours}
          onChange={(v) => setField("workingHours", v)}
          placeholder="Mon — Fri: 08:00 – 17:00, Sat: 09:00 – 13:00"
        />

        <TextField
          label="Map embed URL (OpenStreetMap / Google Maps embed link)"
          value={form.mapEmbedUrl}
          onChange={(v) => setField("mapEmbedUrl", v)}
        />

        <div>
          <h3 className="text-sm font-semibold text-forest mb-3">Social links</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <TextField label="Instagram URL" value={form.social?.instagram} onChange={(v) => setSocial("instagram", v)} />
            <TextField label="X (Twitter) URL" value={form.social?.x} onChange={(v) => setSocial("x", v)} />
            <TextField label="Facebook URL" value={form.social?.facebook} onChange={(v) => setSocial("facebook", v)} />
            <TextField label="TikTok URL" value={form.social?.tiktok} onChange={(v) => setSocial("tiktok", v)} />
            <TextField label="LinkedIn URL" value={form.social?.linkedin} onChange={(v) => setSocial("linkedin", v)} />
          </div>
        </div>

        <button
          disabled={saving}
          className="bg-forest text-cream px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-emerald transition disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save settings"}
        </button>
      </form>
    </div>
  );
}
