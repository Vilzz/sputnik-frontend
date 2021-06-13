import { useState } from 'react'
import Link from 'next/link'
import fs from 'fs'
import axios from 'axios'
import Layout from '@/components/Layout'
import AdminRoutesProtection from '@/components/AdminRoutesProtection'
import { FaPlus, FaImage, FaRegSave, FaList } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { parseCookies } from '@/helpers/index'
import { API_URL } from '@/config/index'
import { Form, Col, Row, Button } from 'react-bootstrap'

const CreateMaket = ({ token, maketImages, categories }) => {
  const [maketData, setMaketData] = useState({
    name: '',
    name_en: '',
    shortdesc: '',
    shortdesc_en: '',
    description: '',
    description_en: '',
    keywords: '',
    keywords_en: '',
    prodtime: '',
    category: '',
    published: false,
  })
  const [images, setImages] = useState([])
  const [scales, setScales] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ ...maketData, images, scales })
  }
  const handleChange = (e) => {
    setMaketData({ ...maketData, [e.target.name]: e.target.value })
  }
  return (
    <Layout>
      <ToastContainer />
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <h1 className='text-primary mb-3'>
            <FaPlus /> Создать макет
          </h1>
          <hr />
        </Col>
      </Row>

      <Form onSubmit={(e) => handleSubmit(e)}>
        <Row className='justify-content-md-start mb-3'>
          <Col md={{ span: 4, offset: 1 }}>
            <Form.Check
              className='form-switch'
              type='checkbox'
              label='Опубликовать'
              checked={maketData.published}
              onChange={(e) =>
                setMaketData({
                  ...maketData,
                  published: e.target.checked,
                })
              }
            />
          </Col>
        </Row>
        <Row className='justify-content-md-center mb-2'>
          <Col md={5}>
            <Form.Label>Наименование</Form.Label>
            <Form.Control
              size='sm'
              type='text'
              placeholder='Введите наименование макета'
              name='name'
              value={maketData.name}
              onChange={(e) => handleChange(e)}
              required
            />
          </Col>
          <Col md={5}>
            <Form.Label>Наименование на английском</Form.Label>
            <Form.Control
              size='sm'
              type='text'
              placeholder='Введите наименование макета на английском'
              name='name_en'
              value={maketData.name_en}
              onChange={(e) => handleChange(e)}
              required
            />
          </Col>
        </Row>
        <Row className='justify-content-md-center mb-2'>
          <Col md={5}>
            <Form.Label>Краткое описание</Form.Label>
            <Form.Control
              size='sm'
              type='text'
              placeholder='Введите краткое описание макета'
              name='shortdesc'
              value={maketData.shortdesc}
              onChange={(e) => handleChange(e)}
              required
            />
          </Col>
          <Col md={5}>
            <Form.Label>Краткое описание на английском</Form.Label>
            <Form.Control
              size='sm'
              type='text'
              placeholder='Введите краткое описание макета на английском'
              name='shortdesc_en'
              value={maketData.shortdesc_en}
              onChange={(e) => handleChange(e)}
              required
            />
          </Col>
        </Row>
        <Row className='justify-content-md-center mb-2'>
          <Col md={5}>
            <Form.Label>Описание</Form.Label>
            <Form.Control
              as='textarea'
              size='sm'
              type='text'
              placeholder='Введите описание макета'
              name='description'
              value={maketData.description}
              onChange={(e) => handleChange(e)}
              required
            />
          </Col>
          <Col md={5}>
            <Form.Label>Описание на английском</Form.Label>
            <Form.Control
              as='textarea'
              size='sm'
              type='text'
              placeholder='Введите описание макета на английском'
              name='description_en'
              value={maketData.description_en}
              onChange={(e) => handleChange(e)}
              required
            />
          </Col>
        </Row>
        <Row className='justify-content-md-center mb-2'>
          <Col md={5}>
            <Form.Label>Ключевые слова</Form.Label>
            <Form.Control
              as='textarea'
              size='sm'
              type='text'
              placeholder='Введите ключевые слова, через запятую'
              name='keywords'
              value={maketData.keywords}
              onChange={(e) => handleChange(e)}
              required
            />
          </Col>
          <Col md={5}>
            <Form.Label>Ключевые слова на английском</Form.Label>
            <Form.Control
              as='textarea'
              size='sm'
              type='text'
              placeholder='Введите ключевые слова, через запятую, на английском'
              name='keywords_en'
              value={maketData.keywords_en}
              onChange={(e) => handleChange(e)}
              required
            />
          </Col>
        </Row>
        <Row className='justify-content-md-center mb-2'>
          <Col md={5}>
            <Form.Label>Срок производства макета</Form.Label>
            <Form.Control
              size='sm'
              type='text'
              placeholder='Введите срок производства макета'
              name='prodtime'
              value={maketData.prodtime}
              onChange={(e) => handleChange(e)}
              required
            />
          </Col>
          <Col md={5}>
            <Form.Label>Выбери категорию макета</Form.Label>
            <Form.Control
              as='select'
              name='category'
              onChange={(e) => handleChange(e)}
            >
              {categories.map(({ name, _id }) => (
                <option key={_id} value={_id}>
                  {name}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Row>
        <Row className='justify-content-md-center'>
          <Col md={6} className='d-flex justify-content-md-center'>
            <Button size='lg' className='mt-3' type='submit'>
              <FaRegSave className='me-2' />
              Создать
            </Button>
            <Link href='/admin/makets'>
              <Button
                size='lg'
                variant='secondary'
                className='mt-3 ms-3'
                type='button'
              >
                <FaList className='me-2' />К списку
              </Button>
            </Link>
          </Col>
        </Row>
      </Form>
    </Layout>
  )
}

export default AdminRoutesProtection(CreateMaket)

export const getServerSideProps = async (ctx) => {
  const res = parseCookies(ctx.req)
  const filenames = fs.readdirSync('./public/images/makets')
  const categories = await axios.get(
    `${API_URL}categories?sort=order&select=id, name`
  )
  return {
    props: {
      token: res.token,
      maketImages: filenames,
      categories: categories.data.data,
    },
  }
}
