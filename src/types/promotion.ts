export type PromotionCategory = 'all' | 'deposit' | 'sports' | 'casino'

export type PromotionItem = {
  id: string
  category: Exclude<PromotionCategory, 'all'>
  badge?: 'hot' | 'new'
  gradient: string
}
