import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import Layout from '@/components/Layout'
import AdminRoutesProtection from '@/components/AdminRoutesProtection'
import { FaPlus, FaList, FaRegSave } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { parseCookies } from '@/helpers/index'
import { API_URL } from '@/config/index'
import { Form, Col, Row, Button } from 'react-bootstrap'

const EditVacancy = ({ token, vacancyData }) => {
  const router = useRouter()
  const [vacancy, setVacancy] = useState({
    title: vacancyData.title,
    description: vacancyData.description,
    salary: vacancyData.salary,
    published: vacancyData.published,
  })
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const res = await axios.put(
        `${API_URL}vacancies/${vacancyData._id}`,
        vacancy,
        config
      )
      toast.success('Вакансия изменена успешно')
      setTimeout(() => router.push('/admin/vacancies'), 1000)
    } catch (error) {
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
            <h2 className='text-primary mb-3'>
              <FaPlus /> Изменить вакансию
            </h2>
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
                  value={vacancy.title}
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
                  value={vacancy.description}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Размер зарплаты</Form.Label>
                <Form.Control
                  type='text'
                  name='salary'
                  value={vacancy.salary}
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
                  <FaRegSave className='me-1' /> Изменить
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

export default AdminRoutesProtection(EditVacancy)

export const getServerSideProps = async (ctx) => {
  const res = parseCookies(ctx.req)
  const vacancy = await axios.get(`${API_URL}vacancies/${ctx.query.id}`)

  return {
    props: { token: res.token, vacancyData: vacancy.data.data },
  }
}
