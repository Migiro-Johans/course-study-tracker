export default function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/30 grid place-items-center p-3 z-50" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-white p-4 space-y-3" onClick={e=>e.stopPropagation()}>
        {title && <div className="text-lg font-semibold">{title}</div>}
        <div>{children}</div>
        {footer}
      </div>
    </div>
  )
}