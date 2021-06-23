import { useState } from 'react'
import fs from 'fs'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { parseCookies } from '@/helpers/index'
import { API_URL } from '@/config/index'
import AdminRoutesProtection from '@/components/AdminRoutesProtection'
import Layout from '@/components/Layout'
import { Col, Form, Row, Button } from 'react-bootstrap'
import { FaImage, FaPlusSquare } from 'react-icons/fa'
import Modal from '@/components/Modal'
import ImageUpload from '@/components/ImageUpload'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const createArticle = ({ articleImages, token }) => {
  const router = useRouter()
  const [articleData, setArticleData] = useState({
    title: '',
    text: '',
    image: 'Выбери изображение...',
    isPublished: false,
  })
  const [showModal, setShowModal] = useState(false)
  const handleChange = (e) => {
    setArticleData({
      ...articleData,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const res = await axios.post(
        `${API_URL}articles`,
        { ...articleData },
        config
      )
      toast.success('Статья создана успешно')
      setTimeout(() => router.push('/admin/articles'), 1000)
    } catch (error) {
      console.log(error)
      toast.error(
        `Ошибка: ${error.response.status} ${error.response.data.error})`
      )
    }
  }

  const imageUploaded = (text) => {
    if (text.data === 'Success') {
      toast.success(`Изображение добавлено ${text.file}`)
      setArticleData({ ...articleData, image: text.file })
    } else {
      toast.error(`Ошибка: ${text.error}`)
    }
  }
  return (
    <Layout>
      <ToastContainer />
      <Col md={8}>
        <h1 className='text-primary mt-3'>
          <FaPlusSquare className='me-2' /> Создать статью
        </h1>
        <hr />

        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className='mb-3'>
            <Form.Check
              className='form-switch mt-3'
              type='checkbox'
              label='Опубликовать статью'
              checked={articleData.isPublished}
              onChange={(e) =>
                setArticleData({
                  ...articleData,
                  isPublished: e.target.checked,
                })
              }
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Заголовок статьи</Form.Label>
            <Form.Control
              type='text'
              value={articleData.title}
              placeholder='Введи заголовок статьи'
              name='title'
              onChange={(e) => {
                handleChange(e)
              }}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Текст статьи</Form.Label>
            <Form.Control
              type='text'
              as='textarea'
              value={articleData.text}
              placeholder='Введи текст статьи'
              name='text'
              onChange={(e) => {
                handleChange(e)
              }}
            />
          </Form.Group>
          <Form.Group>
            <Row>
              <Col md={4} className='d-flex flex-column justify-content-center'>
                <div className='m-auto'>
                  {articleData.image !== 'Выбери изображение...' ? (
                    <Image src={articleData.image} width={160} height={100} />
                  ) : (
                    'Изображение не выбрано'
                  )}
                </div>
                <div className='m-auto'>
                  <Button
                    type='button'
                    onClick={() => setShowModal(true)}
                    className='btn-primary btn-icon my-4 fw-bold'
                  >
                    <FaImage className='me-1' /> Загрузить
                  </Button>
                </div>
              </Col>
              <Col md={8}>
                <Form.Label>Выбери изображение</Form.Label>
                <Form.Control
                  as='select'
                  name='image'
                  className='form-select'
                  onChange={(e) => handleChange(e)}
                >
                  <option>{articleData.image}</option>
                  {articleImages
                    .filter(
                      (img) => articleData.image !== `/images/articles/${img}`
                    )
                    .map((img) => (
                      <option key={img} value={`/images/articles/${img}`}>
                        {`/images/articles/${img}`}
                      </option>
                    ))}
                </Form.Control>
                <div className='d-flex justify-content-center my-3'>
                  <Button type='submit' className='me-3 fw-bold'>
                    Сохранить
                  </Button>
                  <Link href='/admin/articles'>
                    <Button
                      type='button'
                      variant='secondary'
                      className='fw-bold'
                    >
                      К списку
                    </Button>
                  </Link>
                </div>
              </Col>
            </Row>
          </Form.Group>
        </Form>
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          title={'Загрузить изображение'}
        >
          <ImageUpload
            imageUploaded={imageUploaded}
            onClose={() => setShowModal(false)}
            token={token}
            folder='articles'
          />
        </Modal>
      </Col>
    </Layout>
  )
}

export default AdminRoutesProtection(createArticle)

export const getServerSideProps = (ctx) => {
  const res = parseCookies(ctx.req)
  const filenames = fs.readdirSync('./public/images/articles')
  return {
    props: {
      token: res.token,
      articleImages: filenames,
    },
  }
}
