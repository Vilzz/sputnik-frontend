import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { GoGear } from 'react-icons/go'
import { FaRegSave } from 'react-icons/fa'
import { TiArrowBackOutline } from 'react-icons/ti'
import { Row, Col, Form, Button } from 'react-bootstrap'
import AdminRoutesProtection from '@/components/AdminRoutesProtection'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { parseCookies } from '@/helpers/index'
import { API_URL } from '@/config/index'

const Editprice = ({ token, maketId, price }) => {
  const router = useRouter()
  const [scale, setScale] = useState(price.scale)
  const [priceData, setPriceData] = useState({
    rub: {
      currency: price.price.rub.currency,
      price: price.price.rub.price,
      symb: price.price.rub.symb,
    },
    usd: {
      currency: price.price.usd.currency,
      price: price.price.usd.price,
      symb: price.price.usd.symb,
    },
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
        `${API_URL}prices/${price._id}`,
        { scale, price: { ...priceData }, maket: maketId },
        config
      )
      toast.success('Цена изменена успешно')
      setTimeout(() => router.push(`/admin/makets/${maketId}/prices`), 1000)
    } catch (error) {
      toast.error(
        `Ошибка: ${error.response.status} ${error.response.data.error})`
      )
    }
  }
  return (
    <Layout>
      <ToastContainer />
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h2 className='text-primary'>
            <GoGear className='me-2' />
            Изменить цену макета
          </h2>
          <hr />
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group>
              <Form.Label>
                Масштаб (варианты: 1:250 , 1:144, 1:100, 1:72, 1:50,1:25)
              </Form.Label>
              <Form.Control
                size='sm'
                type='text'
                value={scale}
                required
                onChange={(e) => setScale(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Цена масштаба в рублях</Form.Label>
              <Form.Control
                size='sm'
                type='text'
                value={priceData.rub.price}
                required
                onChange={(e) =>
                  setPriceData({
                    ...priceData,
                    rub: { ...priceData.rub, price: e.target.value },
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Цена масштаба в долларах</Form.Label>
              <Form.Control
                size='sm'
                type='text'
                value={priceData.usd.price}
                required
                onChange={(e) =>
                  setPriceData({
                    ...priceData,
                    usd: { ...priceData.usd, price: e.target.value },
                  })
                }
              />
            </Form.Group>
            <div className='d-flex justify-content-center mt-3'>
              <Button type='submit' className='me-2'>
                <FaRegSave className='me-3' />
                Сохранить
              </Button>
              <Link href={`/admin/makets/${maketId}/prices`}>
                <a className='btn btn-secondary'>
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

export default AdminRoutesProtection(Editprice)

export const getServerSideProps = async (ctx) => {
  const { id: maketId, price: priceId } = ctx.query
  const res = parseCookies(ctx.req)
  const price = await axios.get(`${API_URL}prices/${priceId}`)
  return {
    props: {
      token: res.token,
      maketId,
      price: price.data.data,
    },
  }
}
