export type WheelPrize = {
  id: string
  label: string
  color: string
  textColor: string
  weight: number
}

export type WheelConfig = {
  prizes: WheelPrize[]
  chances: number
}

export type WheelSpinResult = {
  prizeId: string
  label: string
  extraChance: boolean
  chances: number
}
