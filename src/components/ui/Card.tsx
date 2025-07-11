interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  style?: React.CSSProperties;
}

export default function Card({
  children,
  className = "",
  hover = true,
  style,
}: CardProps) {
  return (
    <div
      style={style}
      className={`
        backdrop-blur-sm bg-white/80 dark:bg-gray-900/80
        border border-gray-200/60 dark:border-gray-700/60
        rounded-lg p-6 
        ${
          hover
            ? "hover:shadow-lg hover:bg-white/90 dark:hover:bg-gray-900/90"
            : ""
        } 
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
}
