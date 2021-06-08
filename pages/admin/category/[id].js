import { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '@/components/Layout'

import { API_URL } from '@/config/index'
import AdminRoutesProtection from '@/components/AdminRoutesProtection'
import { parseCookies } from '@/helpers/index'
import { Col, Form } from 'react-bootstrap'

const CategoryEdit = ({ token, category }) => {
  const [categoryData, setCategoryData] = useState({
    name: '',
    name_en: '',
    description: '',
    description_en: '',
    image: '',
    order: '',
    showinmenu: false,
  })
  useEffect(() => {
    category !== null &&
      setCategoryData({
        name: category.name,
        name_en: category.name_en,
        description: category.description,
        description_en: category.description_en,
        image: category.image,
        order: category.order,
        showinmenu: category.showinmenu,
      })
  }, [category])
  const onChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value })
  }
  const updateCategory = (e) => {
    e.preventDefault()
    console.log(categoryData)
  }
  return (
    <Layout>
      <Col md={6}>
        <h1 className='text-primary'>Редактировать категорию</h1>
        <hr />
        <Form onSubmit={(e) => updateCategory(e)}>
          <Form.Group className='mb-3'>
            <Form.Label>Наименование категории</Form.Label>
            <Form.Control
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
              as='textarea'
              type='text'
              name='description_en'
              value={categoryData.description_en}
              required
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
        </Form>
      </Col>
    </Layout>
  )
}

export default AdminRoutesProtection(CategoryEdit)

export const getServerSideProps = async (ctx) => {
  const res = parseCookies(ctx.req)
  const category = await axios.get(`${API_URL}categories/${ctx.query.id}`)
  return {
    props: { token: res.token, category: category.data.data },
  }
}
