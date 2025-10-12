export default function Input({ label, error, ...props }) {
  return (
    <label className="block space-y-1">
      {label && <span className="text-sm">{label}</span>}
      <input
        className={`w-full rounded-xl border px-3 py-2 text-sm ${error ? 'border-red-500' : 'border-gray-300'}`}
        {...props}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  )
}