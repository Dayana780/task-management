import { Link } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";
import Button from "../components/ui/Button";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 text-red-500">
        <AlertCircle size={40} />
      </div>
      <h1 className="text-6xl font-bold text-zinc-900">404</h1>
      <p className="mt-2 text-lg text-muted">Page not found</p>
      <p className="mt-1 max-w-sm text-sm text-muted">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/dashboard" className="mt-8">
        <Button>
          <span className="flex items-center gap-2">
            <Home size={18} />
            Back to Dashboard
          </span>
        </Button>
      </Link>
    </div>
  );
}

export default NotFound;
