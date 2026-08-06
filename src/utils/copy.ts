import { message } from 'antd'

export async function copyText(
  text: string,
  successTip: string,
  failedTip = successTip,
) {
  try {
    await navigator.clipboard.writeText(text)
    message.success(successTip)
    return true
  } catch {
    message.error(failedTip)
    return false
  }
}
