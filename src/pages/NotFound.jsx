import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-cream px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-forest">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-forest">Page not found</h2>
        <p className="mt-2 text-sm text-forest/60">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-emerald"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
