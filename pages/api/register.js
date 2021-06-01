import cookie from 'cookie'
import axios from 'axios'
import { API_URL } from '@/config/index.js'

export default async (req, res) => {
  try {
    const result = await axios.post(`${API_URL}auth/register`, req.body)
    const { data } = result

    if (result) {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', data.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24 * 7,
          sameSite: 'strict',
          path: '/',
        })
      )
      res.status(201).json({
        data,
      })
    } else {
      res.status(result.data.statusCode).json({ message: result.data.message })
    }
  } catch (error) {
    console.log(error)
  }
}
