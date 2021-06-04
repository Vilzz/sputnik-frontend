import cookie from 'cookie'
import { API_URL } from '@/config/index'
import axios from 'axios'

export default async (req, res) => {
  if (req.method === 'GET') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Требуется авторизация' })
      return
    }
    const { token } = cookie.parse(req.headers.cookie)
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const apiRes = await axios.get(`${API_URL}auth/me`, config)
    if (apiRes) {
      res.status(200).json(apiRes.data)
    } else {
      res.status(403).json({ message: 'Требуется авторизация' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
