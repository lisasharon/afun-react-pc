import { NextResponse } from 'next/server'
import { spinWheel } from '@/mock/wheel'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { lang?: string }
  const lang = body.lang === 'en' ? 'en' : 'zh-CN'
  const result = spinWheel(lang)
  if (!result) {
    return NextResponse.json({ message: 'NO_CHANCE' }, { status: 400 })
  }
  return NextResponse.json(result)
}
