import cookie from 'cookie'
import axios from 'axios'
import { API_URL } from '@/config/index.js'

export default async (req, res) => {
  try {
    const result = await axios.post(`${API_URL}auth/register`, req.body)
    if (result) {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', result.data.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24 * 7,
          sameSite: 'strict',
          path: '/',
        })
      )
      res.status(201).json({
        data: result.data,
      })
    }
  } catch (error) {
    res.status(error.response.status).json(error.response.data)
  }
}
