import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
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
import Modal from '@/components/Modal'
import ImageUpload from '@/components/ImageUpload'

const CreateMaket = ({ token, maketImages, categories }) => {
  const router = useRouter()
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
    category: '60c594a53347701fc71ccf5f',
    published: false,
  })
  const [images, setImages] = useState(['Выбери изображение...'])
  const [scales, setScales] = useState([])
  const [imagesList, setImagesList] = useState([
    ...maketImages.map((im) => `/images/makets/${im}`),
  ])
  const [showModal, setShowModal] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const res = await axios.post(
        `${API_URL}makets`,
        { ...maketData, images, scales },
        config
      )
      toast.success('Макет создан успешно')
      setTimeout(() => router.push('/admin/makets'), 1000)
    } catch (error) {
      toast.error(
        `Ошибка: ${error.response.status} ${error.response.data.error})`
      )
    }
  }
  const handleChange = (e) => {
    if (e.target.name === 'keywords' || e.target.names === 'keywords_en') {
      setMaketData({ ...maketData, [e.target.name]: e.target.value.split(',') })
    }
    setMaketData({ ...maketData, [e.target.name]: e.target.value })
  }

  const imageSelected = (e) => {
    setImages([e.target.value])
  }

  const checkBoxChange = (e) => {
    const scalesArray = scales
    const sortScales = (a, b) => {
      if (parseInt(a.slice(2)) > parseInt(b.slice(2))) {
        return -1
      }
      if (parseInt(a.slice(2)) < parseInt(b.slice(2))) {
        return 1
      }
      return 0
    }
    if (e.target.checked) {
      scalesArray.push(e.target.name)
      setScales([...scalesArray.sort(sortScales)])
    } else {
      setScales([
        ...scalesArray
          .filter((scale) => scale !== e.target.name)
          .sort(sortScales),
      ])
    }
  }
  const imageUploaded = (text) => {
    if (text.data === 'Success') {
      toast.success(`Изображение добавлено ${text.file}`)
      setImages([text.file])
      setImagesList([text.file, ...imagesList])
    } else {
      toast.error(`Ошибка: ${text.error}`)
    }
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
          <Col md={{ span: 5, offset: 1 }}>
            <Form.Label className='me-3'>Выбери масштабы: </Form.Label>
            <Form.Group>
              <Form.Check
                inline
                type='checkbox'
                label='1:250'
                name='1:250'
                onChange={(e) => checkBoxChange(e)}
              />
              <Form.Check
                inline
                type='checkbox'
                label='1:144'
                name='1:144'
                onChange={(e) => checkBoxChange(e)}
              />
              <Form.Check
                inline
                type='checkbox'
                label='1:100'
                name='1:100'
                onChange={(e) => checkBoxChange(e)}
              />
              <Form.Check
                inline
                type='checkbox'
                label='1:72'
                name='1:72'
                onChange={(e) => checkBoxChange(e)}
              />
              <Form.Check
                inline
                type='checkbox'
                label='1:50'
                name='1:50'
                onChange={(e) => checkBoxChange(e)}
              />
              <Form.Check
                inline
                type='checkbox'
                label='1:25'
                name='1:25'
                onChange={(e) => checkBoxChange(e)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Check
              className='form-switch mt-3'
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
              size='sm'
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
          <Col md={{ span: 2, offset: 1 }}>
            {images[0] !== 'Выбери изображение...' ? (
              <Image src={images[0]} width={70} height={105} />
            ) : (
              <h5 className='mt-4'>Не выбрано</h5>
            )}
          </Col>
          <Col md={3}>
            <Form.Label>Выбери изображение для макета</Form.Label>
            <Form.Control
              as='select'
              name='image'
              onChange={(e) => imageSelected(e)}
            >
              <option>{images[0]}</option>
              {imagesList
                .filter((img) => img !== images[0])
                .map((img) => (
                  <option key={img} value={img}>
                    {img}
                  </option>
                ))}
            </Form.Control>
            <Button
              type='button'
              onClick={() => setShowModal(true)}
              className='btn-primary btn-icon my-4 fw-bold'
            >
              <FaImage className='me-1' /> Загрузить
            </Button>
          </Col>
          <Col md={5} className='d-flex justify-content-md-center'>
            <div>
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
            </div>
          </Col>
        </Row>
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
          folder='makets'
        />
      </Modal>
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
