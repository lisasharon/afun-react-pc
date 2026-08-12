/** 前端 mock 登录态，PC / H5 顶栏共用。后续接真实鉴权时替换这里即可。修改 isLoggedIn: false, 为 true 即可登录*/
export const AUTH = {
  isLoggedIn: true,
  balance: '1382.51',
  currency: '¥',
} as const
