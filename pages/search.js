import { useRouter } from 'next/router'
import axios from 'axios'
import Layout from '@/components/Layout'
import MaketCard from '@/components/MaketCard'
import { API_URL } from '@/config/index'
import { FaSearch, FaSnowman } from 'react-icons/fa'
import { Col } from 'react-bootstrap'

const SearchResults = ({ searchResult }) => {
  const router = useRouter()
  return (
    <Layout>
      <Col md={{ span: 10, offset: 1 }}>
        <h1 className='text-primary mt-3 mb-2 ms-5'>
          <FaSearch className='me-2' />
          {router.locale === 'ru-RU' ? 'Результат поиска' : 'Search results'}
        </h1>
        <div className='px-4 mb-3'>
          <hr />
        </div>
        {searchResult.length > 0 ? (
          <div className='d-flex flex-wrap justify-content-evenly align-items-start p-mx-5'>
            {searchResult.map((res) => (
              <MaketCard maket={res} key={res._id} />
            ))}
          </div>
        ) : (
          <h5 className='text-center'>
            {router.locale === 'ru-RU' ? (
              <>
                <FaSnowman className='me-2' /> По вашему запросу ничего не
                найдено
              </>
            ) : (
              <>
                <FaSnowman className='me-2' /> No results found for you request
              </>
            )}
          </h5>
        )}
      </Col>
    </Layout>
  )
}

export default SearchResults

export const getServerSideProps = async (ctx) => {
  const res = await axios.get(
    `${API_URL}makets?search=${encodeURI(ctx.query.search)}&sort=name`
  )
  return {
    props: {
      searchResult: res.data.data,
    },
  }
}
