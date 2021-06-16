import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import fs from 'fs'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from '@/components/Modal'
import { FaPlus, FaImage, FaRegSave, FaList } from 'react-icons/fa'
import Layout from '@/components/Layout'
import ImageUpload from '@/components/ImageUpload'
import { API_URL } from '@/config/index'
import AdminRoutesProtection from '@/components/AdminRoutesProtection'
import { parseCookies } from '@/helpers/index'
import { Col, Form, Button } from 'react-bootstrap'
//******************************************************** */
//@TODO Изменить место загрузки картинки на сервер NEXTjs
//******************************************************* */
const CreateCategory = ({ token, filenames }) => {
  const router = useRouter()
  const [categoryData, setCategoryData] = useState({
    name: '',
    name_en: '',
    description: '',
    description_en: '',
    order: '',
    showinmenu: false,
  })
  const [image, setImage] = useState('')

  const [showModal, setShowModal] = useState(false)

  const onChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value })
  }

  const updateCategory = async (e) => {
    e.preventDefault()
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const res = await axios.post(
        `${API_URL}categories`,
        { ...categoryData, image },
        config
      )
      toast.success('Категория создана успешно')
      setTimeout(() => router.push('/admin/category'), 1500)
    } catch (error) {
      toast.error(
        `Ошибка: ${error.response.status} ${error.response.data.error})`
      )
    }
  }
  const imageUploaded = (text) => {
    if (text.success) {
      toast.success(`Изображение добавлено ${text.data}`)
    } else {
      toast.error(`Ошибка: ${text.error}`)
    }
  }
  return (
    <Layout>
      <ToastContainer />
      <Col
        md={{ span: 4 }}
        className='d-flex justify-content-evenly align-items-center flex-column'
      >
        <h3>Изображение</h3>
        {image ? (
          <Image src={image} width={160} height={160} />
        ) : (
          <div>
            <p>Изображение не выбрано</p>
          </div>
        )}
        <div className='d-flex justify-content-evenly flex-wrap'>
          {filenames.map((file) => (
            <Button
              size='sm'
              key={file}
              className='mb-1'
              variant='outline-warning'
              onClick={() => setImage(`/images/icons/${file}`)}
            >
              <Image src={`/images/icons/${file}`} width={30} height={30} />
            </Button>
          ))}
        </div>

        <Button
          type='button'
          onClick={() => setShowModal(true)}
          className='btn-primary btn-icon my-4 fw-bold'
        >
          <FaImage className='me-1' /> Загрузить
        </Button>
      </Col>
      <Col md={{ offset: 1, span: 6 }}>
        <h1 className='text-primary'>
          <FaPlus className='me-2' />
          Создать категорию
        </h1>
        <hr />
        <Form onSubmit={(e) => updateCategory(e)}>
          <Form.Group className='mb-3'>
            <Form.Label>Наименование категории</Form.Label>
            <Form.Control
              size='sm'
              type='text'
              name='name'
              value={categoryData.name}
              placeholder='Добавь наименование категории'
              required
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Наименование категории на английском</Form.Label>
            <Form.Control
              size='sm'
              type='text'
              name='name_en'
              value={categoryData.name_en}
              placeholder='Добавь наименование категории на английском'
              required
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Описание категории</Form.Label>
            <Form.Control
              size='sm'
              as='textarea'
              type='text'
              name='description'
              value={categoryData.description}
              placeholder='Добавь описание категории'
              required
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Описание категории на английском языке</Form.Label>
            <Form.Control
              size='sm'
              as='textarea'
              type='text'
              name='description_en'
              value={categoryData.description_en}
              placeholder='Добавь описание категории на английском'
              required
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Порядковый номер</Form.Label>
            <Form.Control
              size='sm'
              type='number'
              name='order'
              value={categoryData.order}
              placeholder='Добавь порядковый номер категории'
              required
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Form.Check
            className='form-switch'
            type='checkbox'
            label='Показать в меню'
            checked={categoryData.showinmenu}
            onChange={(e) =>
              setCategoryData({
                ...categoryData,
                showinmenu: e.target.checked,
              })
            }
          />
          <Button size='lg' className='mt-3 fw-bold' type='submit'>
            <FaRegSave className='me-2' />
            Сохранить
          </Button>
          <Link href='/admin/category'>
            <Button
              size='lg'
              variant='secondary'
              className='mt-3 ms-3 fw-bold'
              type='button'
            >
              <FaList className='me-2' />К списку
            </Button>
          </Link>
        </Form>
      </Col>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={'Загрузить изображение'}
      >
        <ImageUpload
          imageUploaded={imageUploaded}
          onClose={() => setShowModal(false)}
          token={token}
        />
      </Modal>
    </Layout>
  )
}

export default AdminRoutesProtection(CreateCategory)

export const getServerSideProps = async (ctx) => {
  const res = parseCookies(ctx.req)
  const filenames = fs.readdirSync('./public/images/icons')

  return {
    props: { token: res.token, filenames },
  }
}
