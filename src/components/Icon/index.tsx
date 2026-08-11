type IconProps = {
  name: string
  size?: number
  className?: string
}

export function Icon({ name, size = 20, className }: IconProps) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    'aria-hidden': true as const,
  }

  switch (name) {
    case 'menu':
      return (
        <svg {...props}>
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      )
    case 'search':
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" />
        </svg>
      )
    case 'game':
      return (
        <svg {...props}>
          <rect x="2" y="6" width="20" height="12" rx="3" />
          <circle cx="8" cy="12" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="16" cy="10.5" r="1" fill="currentColor" stroke="none" />
          <circle cx="18" cy="13.5" r="1" fill="currentColor" stroke="none" />
          <path d="M7 12h2M8 11v2" />
        </svg>
      )
    case 'star':
      return (
        <svg {...props}>
          <polygon points="12 3 14.5 9.5 21.5 9.5 16 14 18 21 12 17 6 21 8 14 2.5 9.5 9.5 9.5" />
        </svg>
      )
    case 'trophy':
      return (
        <svg {...props}>
          <path d="M7 5h10v4a5 5 0 0 1-10 0V5z" />
          <path d="M7 7H4.5A2.5 2.5 0 0 0 7 9.5M17 7h2.5A2.5 2.5 0 0 1 17 9.5" />
          <path d="M12 14v3M9 20h6" />
        </svg>
      )
    case 'clock':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <polyline points="12 7 12 12 15.5 14.5" />
        </svg>
      )
    case 'gift':
      return (
        <svg {...props}>
          <rect x="3" y="10" width="18" height="11" rx="1" />
          <path d="M12 10v11M3 14h18" />
          <path d="M12 10c-2-3-5-4-5-2s2 2 5 2c3 0 5-1 5-2s-3 1-5 2z" />
        </svg>
      )
    case 'task':
      return (
        <svg {...props}>
          <path d="M9 11l2 2 4-4" />
          <rect x="4" y="3" width="16" height="18" rx="2" />
        </svg>
      )
    case 'vip':
      return (
        <svg {...props}>
          <path d="M3 8l3 10h12l3-10-4.5 3.5L12 5l-2.5 6.5L3 8z" />
        </svg>
      )
    case 'blog':
      return (
        <svg {...props}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      )
    case 'help':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      )
    case 'headset':
      return (
        <svg {...props}>
          <path d="M3 14v-2a9 9 0 0 1 18 0v2" />
          <path d="M21 16a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h3zM3 16a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H3z" />
        </svg>
      )
    case 'globe':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
        </svg>
      )
    case 'chevron-left':
      return (
        <svg {...props}>
          <polyline points="15 18 9 12 15 6" />
        </svg>
      )
    case 'chevron-right':
      return (
        <svg {...props}>
          <polyline points="9 18 15 12 9 6" />
        </svg>
      )
    case 'chevron-down':
      return (
        <svg {...props}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      )
    case 'user':
      return (
        <svg {...props} fill="currentColor" stroke="none">
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 19c0-3.5 3-5.5 7-5.5s7 2 7 5.5" />
        </svg>
      )
    case 'fire':
      return (
        <svg {...props} fill="currentColor" stroke="none">
          <path d="M12 2c1 3 0 5-1.5 6.5C8.5 10.5 7 12 7 15a5 5 0 0 0 10 0c0-2.5-1-4.5-2.5-6C16 7 15 4.5 12 2z" />
        </svg>
      )
    case 'lobby':
      return (
        <svg {...props}>
          <path d="M3 10.5L12 3l9 7.5" />
          <path d="M5 9.5V20h14V9.5" />
          <path d="M10 20v-6h4v6" />
        </svg>
      )
    case 'providers':
      return (
        <svg {...props}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      )
    case 'slots':
      return (
        <svg {...props}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <circle cx="12" cy="10" r="3" />
          <line x1="8" y1="16" x2="16" y2="16" />
          <line x1="9" y1="19" x2="15" y2="19" />
        </svg>
      )
    case 'fishing':
      return (
        <svg {...props}>
          <path d="M2 12s3-6 10-6 10 6 10 6-3 6-10 6S2 12 2 12z" />
          <circle cx="12" cy="12" r="2" />
          <path d="M18 8l3-3" />
        </svg>
      )
    case 'cards':
      return (
        <svg {...props}>
          <rect x="5" y="3" width="11" height="15" rx="1.5" transform="rotate(-8 10.5 10.5)" />
          <rect x="8" y="5" width="11" height="15" rx="1.5" />
        </svg>
      )
    case 'browse':
      return (
        <svg {...props}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      )
    case 'sports':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3c2.5 2.2 4 5.4 4 9s-1.5 6.8-4 9c-2.5-2.2-4-5.4-4-9s1.5-6.8 4-9z" />
          <path d="M3.5 9.5h17M3.5 14.5h17" />
        </svg>
      )
    case 'football':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3c2.5 2.2 4 5.4 4 9s-1.5 6.8-4 9c-2.5-2.2-4-5.4-4-9s1.5-6.8 4-9z" />
          <path d="M3.5 9.5h17M3.5 14.5h17" />
        </svg>
      )
    case 'basketball':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v18M3 12h18" />
          <path d="M5 5c4 3 6 7 6 14M19 5c-4 3-6 7-6 14" />
        </svg>
      )
    case 'tennis':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M6 5c4 3 8 7 13 8M5 6c3 4 7 8 8 13" />
        </svg>
      )
    case 'baseball':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M7 4.5c3 3 4 8 3.5 15M17 4.5c-3 3-4 8-3.5 15" />
        </svg>
      )
    case 'darts':
      return (
        <svg {...props}>
          <circle cx="12" cy="13" r="7" />
          <circle cx="12" cy="13" r="3.5" />
          <path d="M12 3v3M10 3h4" />
        </svg>
      )
    case 'handball':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 5c3 2 5 6 5 14M16 6c-2 3-3 7-2 13" />
        </svg>
      )
    case 'hockey':
      return (
        <svg {...props}>
          <path d="M5 17c2-6 5-10 7-12 2 2 5 6 7 12" />
          <path d="M4 18h16" />
          <circle cx="12" cy="8" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'live':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <polygon points="10,8 17,12 10,16" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'bets':
      return (
        <svg {...props}>
          <path d="M6 4h9a2 2 0 0 1 2 2v14l-4.5-2.5L8 20V6a2 2 0 0 1 2-2" />
          <path d="M10 8h5M10 12h4" />
        </svg>
      )
    case 'rebate':
      return (
        <svg {...props}>
          <circle cx="9" cy="14" r="4.5" />
          <circle cx="15" cy="11" r="4.5" />
          <circle cx="11" cy="8" r="4" />
        </svg>
      )
    case 'odds':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.5-4-9s1.5-6.5 4-9z" />
        </svg>
      )
    case 'minigames':
      return (
        <svg {...props}>
          <rect x="3" y="8" width="18" height="10" rx="3" />
          <circle cx="8" cy="13" r="1.2" fill="currentColor" stroke="none" />
          <path d="M7 13h2M8 12v2" />
          <circle cx="15" cy="11.5" r="1" fill="currentColor" stroke="none" />
          <circle cx="17.5" cy="14" r="1" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'lottery':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="12" cy="8" r="1" fill="currentColor" stroke="none" />
          <circle cx="15.5" cy="13.5" r="1" fill="currentColor" stroke="none" />
          <circle cx="8.5" cy="13.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'eye':
      return (
        <svg {...props}>
          <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )
    case 'eye-off':
      return (
        <svg {...props}>
          <path d="M3 3l18 18" />
          <path d="M10.6 10.6A3 3 0 0 0 12 15a3 3 0 0 0 2.4-4.4" />
          <path d="M9.9 5.1A11 11 0 0 1 12 5c6 0 10 7 10 7a18 18 0 0 1-3.2 3.9" />
          <path d="M6.1 6.1C3.8 7.8 2 12 2 12s4 7 10 7a10 10 0 0 0 4.1-.9" />
        </svg>
      )
    case 'close':
      return (
        <svg {...props}>
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      )
    case 'bell':
      return (
        <svg {...props}>
          <path d="M6 9a6 6 0 0 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9" />
          <path d="M10 21a2 2 0 0 0 4 0" />
        </svg>
      )
    case 'message':
      return (
        <svg {...props}>
          <path d="M21 12a8 8 0 0 1-8 8H6l-4 3V12a8 8 0 1 1 19 0z" />
        </svg>
      )
    case 'ticket':
      return (
        <svg {...props}>
          <path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a2 2 0 0 0 0 4v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1a2 2 0 0 0 0-4V8z" />
          <path d="M9 8v10M12 10h4M12 14h3" />
        </svg>
      )
    case 'download':
      return (
        <svg {...props}>
          <path d="M12 4v10" />
          <path d="M8 10l4 4 4-4" />
          <path d="M5 18h14" />
        </svg>
      )
    case 'copy':
      return (
        <svg {...props}>
          <rect x="9" y="9" width="11" height="11" rx="2" />
          <path d="M5 15V5a2 2 0 0 1 2-2h10" />
        </svg>
      )
    case 'refresh':
      return (
        <svg {...props}>
          <path d="M20 12a8 8 0 1 1-2.2-5.5" />
          <polyline points="20 4 20 10 14 10" />
        </svg>
      )
    case 'bank-card':
      return (
        <svg {...props}>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <line x1="7" y1="14" x2="11" y2="14" />
        </svg>
      )
    case 'affiliate':
      return (
        <svg {...props}>
          <circle cx="6" cy="8" r="2.5" />
          <circle cx="18" cy="8" r="2.5" />
          <circle cx="12" cy="17" r="2.5" />
          <path d="M8 9.5l3 5.5M16 9.5l-3 5.5M8.5 8h7" />
        </svg>
      )
    case 'interest':
      return (
        <svg {...props}>
          <rect x="5" y="8" width="14" height="11" rx="2" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" />
          <circle cx="12" cy="13.5" r="1.5" />
        </svg>
      )
    case 'redeem':
      return (
        <svg {...props}>
          <path d="M4 9h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9z" />
          <path d="M4 9l2-4h12l2 4" />
          <path d="M12 5v16" strokeDasharray="2 2" />
        </svg>
      )
    case 'settings':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v2M12 19v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M3 12h2M19 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      )
    case 'shield':
      return (
        <svg {...props}>
          <path d="M12 3l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      )
    case 'plus':
      return (
        <svg {...props}>
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      )
    case 'wallet':
      return (
        <svg {...props}>
          <path d="M3 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" />
          <path d="M3 11h18" />
          <circle cx="17" cy="15" r="1" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'transfer':
      return (
        <svg {...props}>
          <path d="M7 7h11l-3-3" />
          <path d="M17 17H6l3 3" />
        </svg>
      )
    case 'chart':
      return (
        <svg {...props}>
          <line x1="6" y1="18" x2="6" y2="10" />
          <line x1="12" y1="18" x2="12" y2="6" />
          <line x1="18" y1="18" x2="18" y2="13" />
        </svg>
      )
    case 'calendar':
      return (
        <svg {...props}>
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <line x1="4" y1="10" x2="20" y2="10" />
          <line x1="9" y1="3" x2="9" y2="7" />
          <line x1="15" y1="3" x2="15" y2="7" />
        </svg>
      )
    case 'facebook':
      return (
        <svg {...props} fill="currentColor" stroke="none">
          <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'telegram':
      return (
        <svg {...props} fill="currentColor" stroke="none">
          <path d="M21 5L3.5 12.5 8 14l1.5 5L12 16l5.5 4L21 5zM9.5 13.5l7.8-5.2-6.2 6.6-.4 2.1-1.2-3.5z" />
        </svg>
      )
    case 'tiktok':
      return (
        <svg {...props} fill="currentColor" stroke="none">
          <path d="M14 4c.8 1.8 2.2 3 4 3.4V10c-1.6-.1-3-.7-4-1.7V15a5 5 0 1 1-5-5v2.2a2.8 2.8 0 1 0 2.8 2.8V4h2.2z" />
        </svg>
      )
    case 'x':
      return (
        <svg {...props} fill="currentColor" stroke="none">
          <path d="M4 4l6.8 8.7L4.6 20H7l5-6.2L16.8 20H20l-7-9 6.4-7H17l-4.6 5.7L8.2 4H4z" />
        </svg>
      )
    case 'youtube':
      return (
        <svg {...props} fill="currentColor" stroke="none">
          <path d="M21.5 8.2a2.6 2.6 0 0 0-1.8-1.8C18 6 12 6 12 6s-6 0-7.7.4A2.6 2.6 0 0 0 2.5 8.2 27 27 0 0 0 2 12a27 27 0 0 0 .5 3.8 2.6 2.6 0 0 0 1.8 1.8C6 18 12 18 12 18s6 0 7.7-.4a2.6 2.6 0 0 0 1.8-1.8A27 27 0 0 0 22 12a27 27 0 0 0-.5-3.8zM10 15V9l5 3-5 3z" />
        </svg>
      )
    default:
      return null
  }
}
