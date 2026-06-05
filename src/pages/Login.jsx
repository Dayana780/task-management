import { useForm } from "react-hook-form";
import { LayoutDashboard } from "lucide-react";
import Button from "../components/ui/Button";

function Login() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // Demo login — test@gmail.com / 123456
    if (data.Email === "test@gmail.com" && data.Password === "123456") {
      localStorage.setItem("token", "fake-token");
      localStorage.setItem("userEmail", data.Email);
      localStorage.setItem("userName", "کاربر");
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-surface to-zinc-100 px-4">
      <div className="w-full max-w-md">
        {/* Logo area */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-blue-200">
            <LayoutDashboard size={28} />
          </div>
          <h1 className="text-2xl font-bold text-zinc-900">TaskFlow</h1>
          <p className="mt-1 text-sm text-muted">Sign in to manage your tasks</p>
        </div>

        {/* Login form card */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
        >
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                Email
              </label>
              <input
                {...register("Email")}
                className="w-full rounded-lg border border-border bg-zinc-50 px-4 py-2.5 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                type="email"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                Password
              </label>
              <input
                {...register("Password")}
                className="w-full rounded-lg border border-border bg-zinc-50 px-4 py-2.5 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                type="password"
                placeholder="Enter password"
              />
            </div>
          </div>

          <Button type="submit" className="mt-6 w-full py-2.5">
            Login
          </Button>

          <p className="mt-4 text-center text-xs text-muted">
            Demo: test@gmail.com / 123456
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
