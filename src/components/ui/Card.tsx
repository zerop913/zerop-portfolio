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
        border border-gray-200 
        rounded-lg p-6 
        ${hover ? "hover:shadow-sm" : ""} 
        transition-all duration-200 
        ${className}
      `}
    >
      {children}
    </div>
  );
}
