export function PageLoader({ label = "Loading…" }) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="flex items-center gap-3 text-forest/60">
        <span className="size-4 rounded-full border-2 border-forest/20 border-t-emerald animate-spin" />
        <span className="text-sm font-medium">{label}</span>
      </div>
    </div>
  );
}

export function PageError({ message = "Something went wrong.", onRetry }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center text-center px-6">
      <p className="text-forest/70">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-full bg-forest text-cream px-5 py-2 text-sm font-semibold hover:bg-emerald transition"
        >
          Try again
        </button>
      )}
    </div>
  );
}

export function EmptyState({ message = "Nothing to show yet." }) {
  return (
    <div className="rounded-2xl border border-dashed border-forest/20 p-10 text-center text-forest/50">
      {message}
    </div>
  );
}
