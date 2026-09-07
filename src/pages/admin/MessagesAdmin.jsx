import { useCallback, useState } from "react";
import { Mail, Trash2, CheckCircle2, Archive, Circle } from "lucide-react";
import { useFetch } from "../../hooks/useFetch";
import { contactApi } from "../../api/resources";
import { PageLoader, PageError, EmptyState } from "../../components/Feedback";

const statusStyles = {
  new: "bg-emerald/10 text-emerald",
  read: "bg-forest/10 text-forest",
  archived: "bg-forest/5 text-forest/40",
};

export default function MessagesAdmin() {
  const [filter, setFilter] = useState("");
  const fetcher = useCallback(() => contactApi.list(filter ? `status=${filter}` : ""), [filter]);
  const { data: messages, loading, error, reload } = useFetch(fetcher, [filter]);
  const [selected, setSelected] = useState(null);

  const updateStatus = async (id, status) => {
    await contactApi.updateStatus(id, status);
    reload();
    if (selected?._id === id) setSelected((s) => ({ ...s, status }));
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this message? This cannot be undone.")) return;
    await contactApi.remove(id);
    setSelected(null);
    reload();
  };

  const openMessage = (msg) => {
    setSelected(msg);
    if (msg.status === "new") updateStatus(msg._id, "read");
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-forest">Contact Messages</h1>
          <p className="text-sm text-forest/60 mt-1">Enquiries submitted through the public contact form.</p>
        </div>
        <div className="flex items-center gap-2">
          {["", "new", "read", "archived"].map((s) => (
            <button
              key={s || "all"}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize ${
                filter === s ? "bg-forest text-cream" : "bg-white text-forest/60 ring-1 ring-forest/10"
              }`}
            >
              {s || "All"}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <PageLoader label="Loading messages…" />
      ) : error ? (
        <PageError message={error} onRetry={reload} />
      ) : !messages?.length ? (
        <EmptyState message="No messages here yet." />
      ) : (
        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl ring-1 ring-forest/10 divide-y divide-forest/5 overflow-hidden">
            {messages.map((m) => (
              <button
                key={m._id}
                onClick={() => openMessage(m)}
                className={`w-full text-left p-4 hover:bg-muted/40 transition ${selected?._id === m._id ? "bg-muted/50" : ""}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-forest text-sm truncate">{m.name}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase ${statusStyles[m.status]}`}>
                    {m.status}
                  </span>
                </div>
                <p className="text-xs text-forest/50 mt-1 truncate">{m.subject}</p>
                <p className="text-[11px] text-forest/40 mt-1">{new Date(m.createdAt).toLocaleString()}</p>
              </button>
            ))}
          </div>

          <div className="lg:col-span-3 bg-white rounded-2xl ring-1 ring-forest/10 p-6">
            {!selected ? (
              <div className="flex h-full items-center justify-center text-forest/40 text-sm py-20">
                <Mail size={18} className="mr-2" /> Select a message to read it
              </div>
            ) : (
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-forest">{selected.subject}</h2>
                    <p className="text-sm text-forest/60 mt-1">
                      {selected.name} &lt;{selected.email}&gt;
                    </p>
                    <p className="text-xs text-forest/40 mt-1">{new Date(selected.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      title="Mark as read"
                      onClick={() => updateStatus(selected._id, "read")}
                      className="p-2 rounded-lg hover:bg-muted text-forest/50 hover:text-emerald"
                    >
                      <CheckCircle2 size={16} />
                    </button>
                    <button
                      title="Archive"
                      onClick={() => updateStatus(selected._id, "archived")}
                      className="p-2 rounded-lg hover:bg-muted text-forest/50 hover:text-forest"
                    >
                      <Archive size={16} />
                    </button>
                    <button
                      title="Mark as new"
                      onClick={() => updateStatus(selected._id, "new")}
                      className="p-2 rounded-lg hover:bg-muted text-forest/50 hover:text-forest"
                    >
                      <Circle size={16} />
                    </button>
                    <button
                      title="Delete"
                      onClick={() => remove(selected._id)}
                      className="p-2 rounded-lg hover:bg-destructive/10 text-forest/50 hover:text-destructive"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <p className="mt-6 text-forest/80 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                <a
                  href={`mailto:${selected.email}?subject=${encodeURIComponent(`Re: ${selected.subject}`)}`}
                  className="inline-flex items-center gap-2 mt-8 bg-forest text-cream px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-emerald transition"
                >
                  <Mail size={15} /> Reply by email
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
