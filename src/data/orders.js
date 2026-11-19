const STORAGE_KEY = 'videobelajar-orders'

export function readOrders() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export function saveOrder(order) {
  const orders = readOrders()
  localStorage.setItem(STORAGE_KEY, JSON.stringify([order, ...orders]))
}
