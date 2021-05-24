import { useRouter } from 'next/router'
import Layout from '@/components/Layout'

const Category = () => {
  const router = useRouter()
  return (
    <Layout>
      <h1>Category</h1>
      <h3>{router.locale}</h3>
    </Layout>
  )
}

export default Category
