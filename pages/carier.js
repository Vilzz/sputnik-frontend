import { useRouter } from 'next/router'
import Vacancies from '@/components/Vacancies'
import Layout from '@/components/Layout'
import axios from 'axios'
import { API_URL } from '../config'
import { FaWrench } from 'react-icons/fa'

const Carier = ({ vacancies }) => {
  const router = useRouter()
  return (
    <Layout
      title={
        router.locale === 'ru-RU' ? 'Вакансии компании' : 'Company hire list'
      }
    >
      <h1 className='text-primary my-3 ms-3'>
        <FaWrench className='me-2' />
        Вакансии компании
      </h1>
      <hr />

      <Vacancies vacancies={vacancies} />
    </Layout>
  )
}

export default Carier

export const getServerSideProps = async (ctx) => {
  const vacancies = await axios.get(`${API_URL}vacancies`)
  return {
    props: {
      vacancies: vacancies.data.data,
    },
  }
}
