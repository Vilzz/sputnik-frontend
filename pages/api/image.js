import nextConnect from 'next-connect'
import cookie from 'cookie'
import multer from 'multer'

const imageRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Что-то пошло не так ${error.message}` })
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Метод ${req.method} запрещен` })
  },
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
// @TODO Доделать проверку на разрешение добавлять фото
imageRoute.use((req, res, next) => {
  if (!req.headers.cookie) {
    res.status(403).json({ message: 'Требуется авторизация' })
    return
  }
  const { token } = cookie.parse(req.headers.cookie)
  // @TODO Вытащить пользователя и проверить его роль
  console.log(token)
  next()
})
imageRoute.use(upload.single('file'))
imageRoute.post((req, res) => {
  res.status(200).json({ data: 'Success', file: req.file.path })
})

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
}
export default imageRoute
