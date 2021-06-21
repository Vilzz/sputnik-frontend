import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'
import Layout from '@/components/Layout'
import AdminRoutesProtection from '@/components/AdminRoutesProtection'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { API_URL, SCALES } from '@/config/index'
import { parseCookies } from '@/helpers/index'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { FaPlusSquare, FaPlus } from 'react-icons/fa'
import { TiArrowBackOutline } from 'react-icons/ti'

const Addprice = ({ token, maketId, defaultScales }) => {
  const router = useRouter()
  const [scale, setScale] = useState('Выбери масштаб')
  const [price, setPrice] = useState({
    rub: {
      price: '',
    },
    usd: {
      price: '',
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (scale === 'Выбери масштаб') {
      toast.error(`Ошибка: Масштаб не выбран!)`)
    } else {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        const res = await axios.post(
          `${API_URL}prices`,
          { scale, price: { ...price }, maket: maketId },
          config
        )
        toast.success('Цена добавлена успешно')
        setTimeout(() => router.push(`/admin/makets/${maketId}/prices`), 1000)
      } catch (error) {
        toast.error(
          `Ошибка: ${error.response.status} ${error.response.data.error})`
        )
      }
    }
  }

  return (
    <Layout>
      <ToastContainer />
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h2 className='text-primary mt-4 mb-3'>
            <FaPlusSquare className='me-2' />
            Добавить цену для макета
          </h2>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group>
              <Form.Label>
                Масштаб (варианты: 1:250 ,1:144, 1:100, 1:72, 1:50, 1:25)
              </Form.Label>
              <Form.Control
                size='sm'
                as='select'
                type='text'
                className='form-select'
                placeholder='Введи наименование масштаба'
                required
                onChange={(e) => setScale(e.target.value)}
              >
                <option>{scale}</option>
                {defaultScales
                  .filter((scl) => scl !== scale)
                  .map((scl) => (
                    <option key={scl}>{scl}</option>
                  ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Цена масштаба в рублях</Form.Label>
              <Form.Control
                size='sm'
                type='text'
                placeholder='Введи цену масштаба в рублях'
                value={price.rub.price}
                required
                onChange={(e) =>
                  setPrice({ ...price, rub: { price: e.target.value } })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Цена масштаба в долларах</Form.Label>
              <Form.Control
                size='sm'
                type='text'
                placeholder='Введи цену масштаба в долларах сша'
                value={price.usd.price}
                required
                onChange={(e) =>
                  setPrice({ ...price, usd: { price: e.target.value } })
                }
              />
            </Form.Group>
            <div className='d-flex justify-content-center mt-3'>
              <Button type='submit' className='me-3 fw-bold'>
                <FaPlus className='me-2' /> Создать
              </Button>
              <Link href={`/admin/makets/${maketId}/prices`}>
                <a className='btn btn-secondary fw-bold'>
                  <TiArrowBackOutline className='me-2' />
                  Вернуться к ценам
                </a>
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Layout>
  )
}
Addprice.defaultProps = {
  defaultScales: SCALES,
}
export default AdminRoutesProtection(Addprice)

export const getServerSideProps = async (ctx) => {
  const maketId = ctx.query.id
  const res = parseCookies(ctx.req)
  return {
    props: {
      token: res.token,
      maketId,
    },
  }
}
