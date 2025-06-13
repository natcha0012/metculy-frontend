export const formatPhoneNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, '').slice(0, 10) // only digits, max 10
  if (cleaned.length <= 3) return cleaned
  if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`
  return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`
}

export default {
  mounted(el: HTMLInputElement) {
    el.addEventListener('input', () => {
      const rawValue = el.value
      const formatted = formatPhoneNumber(rawValue)
      el.value = formatted
    })
  },
}
