import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import fs from 'fs'
import axios from 'axios'
import Modal from '@/components/Modal'
import { FaRegSun, FaImage, FaRegSave, FaList } from 'react-icons/fa'
import Layout from '@/components/Layout'
import ImageUpload from '@/components/ImageUpload'
import { API_URL } from '@/config/index'
import AdminRoutesProtection from '@/components/AdminRoutesProtection'
import { parseCookies } from '@/helpers/index'
import { Col, Form, Button, FormGroup, FormControl } from 'react-bootstrap'

const CategoryEdit = ({ token, category, filenames }) => {
  const [categoryData, setCategoryData] = useState({
    name: category.name,
    name_en: category.name_en,
    description: category.description,
    description_en: category.description_en,
    order: category.order,
    showinmenu: category.showinmenu,
  })
  const [image, setImage] = useState(category.image ? category.image : null)

  const [showModal, setShowModal] = useState(false)

  const onChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value })
  }

  const updateCategory = (e) => {
    e.preventDefault()
    console.log(categoryData)
  }
  const imageUploaded = (e) => {
    console.log(e.target)
  }
  return (
    <Layout>
      <Col
        md={{ span: 4 }}
        className='d-flex justify-content-evenly align-items-center flex-column'
      >
        <h3>Изображение</h3>
        {image ? (
          <Image src={image} width={160} height={160} />
        ) : (
          <div>
            <p>Изображение не загружено</p>
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
          className='btn-primary btn-icon my-4'
        >
          <FaImage className='me-1' /> Загрузить
        </Button>
      </Col>
      <Col md={{ offset: 1, span: 6 }}>
        <h1 className='text-primary'>
          <FaRegSun className='me-2' />
          Редактировать категорию
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
          <Button size='lg' className='mt-3' type='submit'>
            <FaRegSave className='me-2' />
            Сохранить
          </Button>
          <Link href='/admin/category'>
            <Button
              size='lg'
              variant='secondary'
              className='mt-3 ms-3'
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
          catId={category._id}
          imageUploaded={imageUploaded}
          token={token}
        />
      </Modal>
    </Layout>
  )
}

export default AdminRoutesProtection(CategoryEdit)

export const getServerSideProps = async (ctx) => {
  const res = parseCookies(ctx.req)
  const category = await axios.get(`${API_URL}categories/${ctx.query.id}`)
  const filenames = fs.readdirSync('./public/images/icons')

  return {
    props: { token: res.token, category: category.data.data, filenames },
  }
}
