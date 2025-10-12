export default function Button({ children, className="", ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium border border-gray-300 hover:bg-gray-50 disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}