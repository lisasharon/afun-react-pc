import { NextResponse } from 'next/server'
import { drawGacha } from '@/mock/gacha'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { lang?: string }
  const lang = body.lang === 'en' ? 'en' : 'zh-CN'
  const result = drawGacha(lang)
  if (!result) {
    return NextResponse.json({ message: 'NO_CHANCE' }, { status: 400 })
  }
  return NextResponse.json(result)
}
