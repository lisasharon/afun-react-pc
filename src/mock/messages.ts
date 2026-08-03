import type { MessageItem } from '@/types/message'

export const messagesMock: MessageItem[] = [
  { id: 'n1', type: 'notify' },
  { id: 'n2', type: 'notify' },
  { id: 'n3', type: 'notify' },
  { id: 'n4', type: 'notify', read: true },
  { id: 'm1', type: 'mail' },
  { id: 'm2', type: 'mail' },
  { id: 'a1', type: 'announce' },
  { id: 'a2', type: 'announce', read: true },
  { id: 'f1', type: 'feedback' },
  { id: 'f2', type: 'feedback', read: true },
]
