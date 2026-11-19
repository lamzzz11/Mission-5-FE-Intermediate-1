import courseImage from '../assets/images/course-2.jpg'

const STORAGE_KEY = 'videobelajar-orders'
const sampleOrders = ['Berhasil', 'Gagal', 'Belum Bayar', 'Berhasil', 'Berhasil'].map((status, index) => ({
  invoice: 'HEL/VI/100620' + (23 + index),
  title: 'Belajar Microsoft Office dan Google Workspace untuk Pemula',
  image: courseImage,
  amount: 300000,
  status,
  date: '10 Juni 2023, 14.17',
}))

export function readOrders() {
  try {
    const orders = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(orders) && orders.length ? orders : sampleOrders
  } catch {
    return sampleOrders
  }
}

export function saveOrder(order) {
  try {
    const orders = readOrders()
    localStorage.setItem(STORAGE_KEY, JSON.stringify([order, ...orders]))
  } catch { /* The purchase flow can still continue without browser storage. */ }
}
