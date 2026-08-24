import { NextResponse } from 'next/server'
import { getWheelConfig } from '@/mock/wheel'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lang = searchParams.get('lang') === 'en' ? 'en' : 'zh-CN'
  return NextResponse.json(getWheelConfig(lang))
}
