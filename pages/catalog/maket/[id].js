import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { API_URL } from '@/config/index'
import Layout from '@/components/Layout'
const Maket = ({ maket }) => {
  const router = useRouter()
  return (
    <Layout>
      <div className='row mt-3'>
        <div className='col col-md-5'>
          <Image
            src={maket.images[0]}
            width='450px'
            height='675px'
            alt={maket.name}
          />
        </div>
        <div className='col col-md-7'>
          <h1>{maket.name}</h1>
          <h5>{maket.description}</h5>
          <h3>Доступные масштабы:</h3>
          <div className='mb-3'>
            {maket.scales.map((scale, idx) => (
              <span className='badge bg-primary' key={idx}>
                {scale}
              </span>
            ))}
          </div>
          <Link href={`/catalog/${maket.category.slug}`}>
            <a className='btn btn-primary'>В каталог</a>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default Maket

export const getServerSideProps = async (ctx) => {
  const res = await axios.get(`${API_URL}makets/${ctx.query.id}`)
  return {
    props: {
      maket: res.data.data,
    },
  }
}
