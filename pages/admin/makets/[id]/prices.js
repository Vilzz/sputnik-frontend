import axios from 'axios'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GoGear, GoTrashcan } from 'react-icons/go'
import { API_URL } from '@/config/index'
import AdminRoutesProtection from '@/components/AdminRoutesProtection'
import Layout from '@/components/Layout'
import { Row, Col, Table } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { parseCookies } from '@/helpers/index'

const Prices = ({ maket, token }) => {
  const router = useRouter()
  const formatDate = (date) => {
    return format(new Date(date), 'dd-MM-yyyy')
  }
  const deletePrice = async (e) => {
    let id
    if (e.target.nodeName === 'path') {
      id = e.target.parentNode.attributes.data.value
    } else {
      id = e.target.attributes.data.value
    }
    if (confirm(`Будет удалена цена макета! Вы уверены?`)) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        await axios.delete(`${API_URL}prices/${id}`, config)
        toast.success('Цена удалена успешно')
        setTimeout(() => router.push(`/admin/makets`), 1000)
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
          <h2 className='text-primary mb-2 ms-2'>
            Цены на макет <span className='fw-bold'>{maket.name}</span>
          </h2>
          {maket.prices.length > 0 ? (
            <Table striped bordered hover className='table-primary'>
              <thead>
                <tr className='table-dark'>
                  <th>Масштаб</th>
                  <th>Цена рубли</th>
                  <th>Цена доллары</th>
                  <th>На дату</th>
                  <th>Создана</th>
                  <th>Управление</th>
                </tr>
              </thead>
              <tbody>
                {maket.prices.map((price) => (
                  <tr key={price._id}>
                    <td className='text-center'>{price.scale}</td>
                    <td className='text-center'>
                      {price.price.rub.symb} {price.price.rub.price}{' '}
                      {price.price.rub.currency}
                    </td>
                    <td className='text-center'>
                      {price.price.usd.symb} {price.price.usd.price}{' '}
                      {price.price.usd.currency}
                    </td>
                    <td className='text-center'>
                      {formatDate(price.updatedAt)}
                    </td>
                    <td className='text-center'>
                      {formatDate(price.createdAt)}
                    </td>
                    <td className='d-flex justify-content-evenly'>
                      <Link href={`/admin/makets/${maket._id}/editprice`}>
                        <a className='btn btn-xs btn-primary me-1'>
                          <GoGear />
                        </a>
                      </Link>

                      <button
                        className='btn btn-xs btn-danger'
                        data={price._id}
                        onClick={(e) => deletePrice(e)}
                      >
                        <GoTrashcan data={price._id} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <h5>Цены не назначены</h5>
          )}
        </Col>
      </Row>
      <Row>
        <Col
          className='d-flex justify-content-evenly'
          md={{ span: 4, offset: 4 }}
        >
          <Link href={`/admin/makets/${maket._id}/addprice`}>
            <a className='btn btn-primary'>Добавить цену</a>
          </Link>
          <Link href={'/admin/makets'}>
            <a className='btn btn-secondary'>Вернуться к списку</a>
          </Link>
        </Col>
      </Row>
    </Layout>
  )
}

export default AdminRoutesProtection(Prices)

export const getServerSideProps = async (ctx) => {
  const res = parseCookies(ctx.req)
  const maket = await axios.get(`${API_URL}makets/${ctx.query.id}`)
  return {
    props: {
      maket: maket.data.data,
      token: res.token,
    },
  }
}
