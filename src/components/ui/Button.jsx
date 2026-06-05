// Reusable button with default primary style
export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
  variant = "primary",
}) {
  const variants = {
    primary: "bg-primary hover:bg-blue-700 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    ghost: "bg-transparent hover:bg-zinc-100 text-zinc-700 border border-border",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
