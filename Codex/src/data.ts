export type ProductKind = 'headphones' | 'earbuds' | 'speaker'
export type Product = { id: string; name: string; subtitle: string; price: number; kind: ProductKind; color: string; tag: string }
export const finishes = [
  { name: 'Sage', color: '#a9bba2', dark: '#4a5c49' },
  { name: 'Chalk', color: '#e5dfd1', dark: '#827e73' },
  { name: 'Graphite', color: '#505453', dark: '#252b29' },
]
export const products: Product[] = [
  { id: 'forma', name: 'Forma', subtitle: 'Your world. Beautifully tuned.', price: 349, kind: 'headphones', color: '#a9bba2', tag: 'THE NEW STANDARD' },
  { id: 'air', name: 'Air', subtitle: 'Small in size. Infinite in sound.', price: 179, kind: 'earbuds', color: '#e8e4dc', tag: 'EVERYDAY ESSENTIAL' },
  { id: 'room', name: 'Room', subtitle: 'Good sound belongs everywhere.', price: 249, kind: 'speaker', color: '#9fada0', tag: 'MADE FOR YOUR SPACE' },
]
export type CartItem = { productId: string; finish: string; quantity: number }
export const money = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount)
export function loadCart(): CartItem[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem('aure-bag') || '[]')
    if (!Array.isArray(saved)) return []
    return saved.filter((item): item is CartItem => !!item && typeof item === 'object' && products.some(p => p.id === item.productId) && finishes.some(f => f.name === item.finish) && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 99)
  } catch { return [] }
}
