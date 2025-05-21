export default function ErrorFormMessage({ children, type = "error", customClass = "" }: ErrorFormMessageProps) {
  const typeStyles = {
    error: "text-danger",
    warning: "text-warning",
    info: "text-info",
  };

  return (
    <div className={`text-left font-bold p-3 text-xs ${typeStyles[type]} ${customClass}`}>
      * {children}
    </div>
  )
}