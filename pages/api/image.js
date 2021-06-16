import cookie from 'cookie'
import { API_URL } from '@/config/index'
import axios from 'axios'
import fs from 'fs'

export default async (req, res) => {
  console.log(req.files)
  if (req.method === 'POST') {
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
      if (apiRes.data.data.role !== 'Admin') {
        res.status(403).json({ message: 'Доступ запрещен' })
        return
      } else {
        if (!req.files) {
          res.status(400).json({ message: 'Добавь файл с изображением' })
          return
        }
        const folder = req.body.folder || 'img'
        const file = req.files.file
        if (!file.mimetype.startsWith('image')) {
          res.status(400).json({ message: 'Добавь файл с изображением' })
          return
        }
        if (file.size > 1000000) {
          res
            .status(400)
            .json({ message: 'Размер файла изображения не более 1000000' })
          return
        }
        const fullpath = `/images/${folder}/${file.name}`

        if (fs.existsSync(`.${fullpath}`)) {
          fs.unlink(`.${fullpath}`, (err) => {
            if (err) throw err
            file.mv(`.${fullpath}`, (err) => {
              if (err) {
                console.error(err)
                res.status(500).json({ message: 'Проблема при загрузке файла' })
                return
              }

              res.status(200).json({
                success: true,
                data: fullpath,
              })
            })
          })
        } else {
          file.mv(`.${fullpath}`, (err) => {
            if (err) {
              console.error(err)
              res.status(500).json({ message: 'Проблема при загрузке файла' })
              return
            }

            res.status(200).json({
              success: true,
              data: fullpath,
            })
          })
        }
      }
    } else {
      res.status(403).json({ message: 'Требуется авторизация' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
