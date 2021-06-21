import { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import AdminRoutesProtection from '@/components/AdminRoutesProtection'
import Layout from '@/components/Layout'
import { Col, Row, Form, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaPlus, FaRegSave, FaList } from 'react-icons/fa'
import { API_URL } from '@/config/index'
import { parseCookies } from '@/helpers/index'

const CreateVacancy = ({ token }) => {
  const router = useRouter()
  const [vacancy, setVacancy] = useState({
    title: '',
    description: '',
    salary: '',
    published: false,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const res = await axios.post(`${API_URL}vacancies`, vacancy, config)
      toast.success('Вакансия создана успешно')
      setTimeout(() => router.push('/admin/vacancies'), 1000)
    } catch (error) {
      console.log(error)
      toast.error(
        `Ошибка: ${error.response.status} ${error.response.data.error})`
      )
    }
  }
  const handleChange = (e) => {
    setVacancy({
      ...vacancy,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <Layout>
      <Col>
        <ToastContainer />
        <Row>
          <Col sm={{ span: 12 }} md={{ span: 8, offset: 2 }}>
            <h1 className='text-primary mb-3 mt-4'>
              <FaPlus /> Создать вакансию
            </h1>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col sm={{ span: 12 }} md={{ span: 8, offset: 2 }}>
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Form.Group>
                <Form.Label>Наименование вакансии</Form.Label>
                <Form.Control
                  type='text'
                  name='title'
                  className='mb-2'
                  placeholder='Введи наименование вакансии'
                  onChange={(e) => handleChange(e)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Описание вакансии</Form.Label>
                <Form.Control
                  as='textarea'
                  type='text'
                  name='description'
                  className='mb-2'
                  placeholder='Введи описание вакансии'
                  onChange={(e) => handleChange(e)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Размер зарплаты</Form.Label>
                <Form.Control
                  type='text'
                  name='salary'
                  placeholder='Введи размер зарплату'
                  onChange={(e) => handleChange(e)}
                  required
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Check
                  className='form-switch mt-3'
                  type='checkbox'
                  label='Опубликовать'
                  checked={vacancy.published}
                  onChange={(e) =>
                    setVacancy({
                      ...vacancy,
                      published: e.target.checked,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className='d-flex justify-content-center'>
                <Button type='submit' className='me-3' size='lg'>
                  <FaRegSave className='me-1' /> Создать
                </Button>
                <Link href='/admin/vacancies'>
                  <Button as='a' variant='secondary' size='lg'>
                    <FaList className='me-1' /> К вакансиям
                  </Button>
                </Link>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Col>
    </Layout>
  )
}

export default AdminRoutesProtection(CreateVacancy)

export const getServerSideProps = async (ctx) => {
  const res = parseCookies(ctx.req)

  return {
    props: {
      token: res.token,
    },
  }
}
