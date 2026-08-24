import { NextResponse } from 'next/server'
import { getGachaConfig } from '@/mock/gacha'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lang = searchParams.get('lang') === 'en' ? 'en' : 'zh-CN'
  return NextResponse.json(getGachaConfig(lang))
}
