import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import { parseCookies } from '@/helpers/index'
import AdminRoutesProtection from '@/components/AdminRoutesProtection'
import AdminPanelMenu from '@/components/AdminPanelMenu'
import { Col, Row, Table, Button } from 'react-bootstrap'
import { API_URL } from '@/config/index'
import { GoGear, GoTrashcan } from 'react-icons/go'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Vacancies = ({ token, vacancies }) => {
  const router = useRouter()
  const deleteVacancy = async (e) => {
    const vacancyId = e.target.attributes.data.value
    if (confirm(`Вакансия будет удалена! Вы уверены?`)) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        await axios.delete(`${API_URL}vacancies/${vacancyId}`, config)
        toast.success(`Вакансия удалена успешно`)
        router.push('/admin/vacancies')
      } catch (error) {
        toast.error(`${error.response.data.error}`)
      }
    }
  }
  return (
    <Layout>
      <ToastContainer />
      <Col>
        <Row>
          <Col md={3}>
            <AdminPanelMenu title='Вакансии' />
          </Col>
          <Col md={9}>
            <h2 className='text-left text-primary mt-4'>Список вакансий</h2>
            <hr />
            {vacancies.length > 0 ? (
              <Table
                striped
                bordered
                responsive
                size='sm'
                className='table-gray table align-middle'
              >
                <thead>
                  <tr className='table-dark'>
                    <th>#</th>
                    <th>Наименование</th>
                    <th>Описание</th>
                    <th>Зарплата</th>
                    <th>Опубликовано</th>
                    <th>Упр</th>
                  </tr>
                </thead>
                <tbody>
                  {vacancies.map(
                    ({ _id, title, description, salary, published }, idx) => (
                      <tr key={_id}>
                        <td>{idx + 1}</td>
                        <td>{title}</td>
                        <td>{description}</td>
                        <td>{salary}</td>
                        <td>{published ? 'Да' : 'Нет'}</td>
                        <td>
                          <div className='d-flex'>
                            <Link href={`/admin/vacancies/${_id}`}>
                              <Button as='a' className='btn-xs me-1'>
                                <GoGear />
                              </Button>
                            </Link>
                            <Button
                              className='btn-xs'
                              variant='danger'
                              data={_id}
                              onClick={(e) => deleteVacancy(e)}
                            >
                              <GoTrashcan data={_id} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
            ) : (
              <>
                <h4 className='mb-4'>Вы еще не создали ни одной вакансии</h4>
                <Link href='/admin/vacancies/create'>
                  <Button as='a'>Создать вакансию</Button>
                </Link>
              </>
            )}
          </Col>
        </Row>
      </Col>
    </Layout>
  )
}

export default AdminRoutesProtection(Vacancies)

export const getServerSideProps = async (ctx) => {
  const res = parseCookies(ctx.req)

  const vacancies = await axios.get(`${API_URL}vacancies`)
  return {
    props: { token: res.token, vacancies: vacancies.data.data },
  }
}
