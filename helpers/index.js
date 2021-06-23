import cookie from 'cookie'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export function parseCookies(req) {
  if (!req.headers.cookie) {
    return { token: null }
  } else {
    return cookie.parse(req.headers.cookie)
  }
}

export const formatDate = (dt) => {
  return format(new Date(dt), 'dd MMMM yyyy k:mm:ss', { locale: ru })
}
