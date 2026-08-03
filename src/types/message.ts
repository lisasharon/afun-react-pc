export const MESSAGE_TYPES = ['notify', 'mail', 'announce', 'feedback'] as const

export type MessageType = (typeof MESSAGE_TYPES)[number]

export type MessageItem = {
  id: string
  type: MessageType
  read?: boolean
}

export function countUnread(
  messages: MessageItem[],
  type?: MessageType,
) {
  return messages.filter(
    (m) => !m.read && (type === undefined || m.type === type),
  ).length
}
