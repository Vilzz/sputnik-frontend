import nextConnect from 'next-connect'
import cookie from 'cookie'
import multer from 'multer'
import axios from 'axios'
import { API_URL } from '@/config/index'

const imageRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Что-то пошло не так ${error.message}` })
  },
  // onNoMatch(req, res) {
  //   res.status(405).json({ error: `Метод ${req.method} запрещен` })
  // },
  //attachParams: true,
})

const upload = multer({
  limits: { fileSize: 1000000 },
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/img/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    },
  }),
  fileFilter: function (req, file, cb) {
    const acceptFile = ['image/jpeg', 'image/png'].includes(file.mimetype)
    cb(null, acceptFile)
  },
})

imageRoute.use(async (req, res, next) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: `Метод ${req.method} запрещен` })
  }
  if (!req.headers.cookie) {
    res.status(403).json({ message: 'Требуется авторизация' })
  }
  const { token } = cookie.parse(req.headers.cookie)

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const apiRes = await axios.get(`${API_URL}auth/me`, config)
  if (!apiRes || apiRes.data.data.role !== 'Admin') {
    res.status(403).json({ message: 'Доступ запрещен' })
  }
  next()
})
imageRoute.use(upload.single('file'))
imageRoute.post('/api/image', (req, res) => {
  res.status(200).json({ data: 'Success', file: req.file.path })
})

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
}
export default imageRoute
