interface GoldButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  pulse?: boolean;
  target?: string;
  rel?: string;
}

export default function GoldButton({
  children,
  href,
  onClick,
  variant = "solid",
  size = "md",
  className = "",
  pulse = false,
  target,
  rel,
}: GoldButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variantClasses = {
    solid: "gold-gradient text-black font-bold",
    outline:
      "bg-transparent border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black",
  };

  const baseClasses = `inline-flex items-center justify-center gap-2 rounded-full font-[var(--font-lato)] tracking-wide transition-all duration-300 cursor-pointer ${sizeClasses[size]} ${variantClasses[variant]} ${pulse ? "btn-pulse" : ""} ${className}`;

  if (href) {
    return (
      <a href={href} className={baseClasses} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {children}
    </button>
  );
}
