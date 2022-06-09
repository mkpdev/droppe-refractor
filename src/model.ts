export interface Product {
    category?: string
    description: string
    id?: number
    image?: string
    price: string | number
    rating?: { rate: number, count: number }
    count?: number
    rate?: number
    title: string
    isFavorite?: boolean
}