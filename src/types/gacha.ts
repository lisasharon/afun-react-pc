export type GachaPrize = {
  id: string
  label: string
  color: string
  weight: number
}

export type GachaConfig = {
  prizes: GachaPrize[]
  chances: number
}

export type GachaDrawResult = {
  prizeId: string
  label: string
  color: string
  chances: number
}
