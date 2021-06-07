import cookie from 'cookie'

export function parseCookies(req) {
  if (!req.headers.cookie) {
    return { token: null }
  } else {
    return cookie.parse(req.headers.cookie)
  }
}
