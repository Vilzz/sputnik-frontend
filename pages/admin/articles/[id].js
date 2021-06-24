import { useState } from 'react'
import { useRouter } from 'next/router'
import fs from 'fs'
import Image from 'next/image'
import Link from 'next/link'
import AdminRoutesProtection from '@/components/AdminRoutesProtection'
import Layout from '@/components/Layout'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Col, Form, Row, Button } from 'react-bootstrap'
import { parseCookies } from '@/helpers/index'
import axios from 'axios'
import { API_URL } from '@/config/index'
import { FaEdit, FaImage } from 'react-icons/fa'
import Modal from '@/components/Modal'
import ImageUpload from '@/components/ImageUpload'

const EditArticle = ({ token, article, articleImages }) => {
  const router = useRouter()
  const [articleData, setArticleData] = useState({
    title: article.title,
    title_en: article.title_en,
    text: article.text,
    text_en: article.text_en,
    keywords: article.keywords,
    keywords_en: article.keywords_en,
    description: article.description,
    description_en: article.description_en,
    isPublished: article.isPublished,
    image: article.image,
  })
  const [showModal, setShowModal] = useState(false)

  const handleChange = (e) => {
    setArticleData({ ...articleData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const res = await axios.put(
        `${API_URL}articles/${article._id}`,
        { ...articleData },
        config
      )
      toast.success('Статья изменена успешно')
      setTimeout(() => router.push('/admin/articles'), 1000)
    } catch (error) {
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
      <Col md={{ span: 8, offset: 1 }}>
        <h1 className='text-primary mt-3'>
          <FaEdit className='me-2' /> Редактировать статью
        </h1>
        <hr />
        <Col md={12}>
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
            <Row>
              <Col md={6}>
                <Form.Group className='mb-3'>
                  <Form.Label>Заголовок статьи</Form.Label>
                  <Form.Control
                    size='sm'
                    type='text'
                    value={articleData.title}
                    name='title'
                    onChange={(e) => {
                      handleChange(e)
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className='mb-3'>
                  <Form.Label>Заголовок статьи на английском</Form.Label>
                  <Form.Control
                    size='sm'
                    type='text'
                    value={articleData.title_en}
                    name='title_en'
                    onChange={(e) => {
                      handleChange(e)
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className='mb-3'>
                  <Form.Label>Текст статьи</Form.Label>
                  <Form.Control
                    size='sm'
                    type='text'
                    as='textarea'
                    value={articleData.text}
                    name='text'
                    onChange={(e) => {
                      handleChange(e)
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className='mb-3'>
                  <Form.Label>Текст статьи на английском</Form.Label>
                  <Form.Control
                    size='sm'
                    type='text'
                    as='textarea'
                    value={articleData.text_en}
                    name='text_en'
                    onChange={(e) => {
                      handleChange(e)
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className='mb-3'>
                  <Form.Label>Описание статьи</Form.Label>
                  <Form.Control
                    size='sm'
                    type='text'
                    value={articleData.description}
                    name='description'
                    onChange={(e) => {
                      handleChange(e)
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className='mb-3'>
                  <Form.Label>Описание статьи на английском</Form.Label>
                  <Form.Control
                    size='sm'
                    type='text'
                    value={articleData.description_en}
                    name='description_en'
                    onChange={(e) => {
                      handleChange(e)
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className='mb-3'>
                  <Form.Label>Ключевые слова статьи через запятую</Form.Label>
                  <Form.Control
                    size='sm'
                    type='text'
                    value={articleData.keywords}
                    name='keywords'
                    onChange={(e) => {
                      handleChange(e)
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className='mb-3'>
                  <Form.Label>
                    Ключевые слова статьи на английском через запятую
                  </Form.Label>
                  <Form.Control
                    size='sm'
                    type='text'
                    value={articleData.keywords_en}
                    name='keywords_en'
                    onChange={(e) => {
                      handleChange(e)
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group>
              <Row>
                <Col
                  md={4}
                  className='d-flex flex-column justify-content-center'
                >
                  <div className='m-auto'>
                    <Image src={articleData.image} width={160} height={100} />
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
      </Col>
    </Layout>
  )
}

export default AdminRoutesProtection(EditArticle)

export const getServerSideProps = async (ctx) => {
  const res = parseCookies(ctx.req)
  const filenames = fs.readdirSync('./public/images/articles')
  const article = await axios.get(`${API_URL}articles/${ctx.query.id}`)
  return {
    props: {
      token: res.token,
      article: article.data.data,
      articleImages: filenames,
    },
  }
}
