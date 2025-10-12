export const required = (v, msg='Required') => (v ? null : msg)
export const positiveInt = (v, msg='Must be a positive integer') =>
  Number.isInteger(+v) && +v > 0 ? null : msg

export function validate(fields) {
  // fields: {name: [val, ...validators]}
  const errors = {}
  Object.entries(fields).forEach(([k, [val, ...rules]]) => {
    const err = rules.map(r => r(val)).find(Boolean)
    if (err) errors[k] = err
  })
  return errors
}