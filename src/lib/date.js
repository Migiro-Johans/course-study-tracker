export function toISODate(d = new Date()) {
  return new Date(d).toISOString().slice(0,10)
}
export function weekRange(d = new Date()) {
  const day = d.getDay() || 7
  const monday = new Date(d); monday.setDate(d.getDate() - (day - 1))
  const sunday = new Date(monday); sunday.setDate(monday.getDate() + 6)
  const iso = x => x.toISOString().slice(0,10)
  return { start: iso(monday), end: iso(sunday) }
}