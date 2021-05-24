import Layout from '@/components/Layout'
import { useRouter } from 'next/router'

const About = () => {
  const router = useRouter()
  return (
    <Layout
      title={router.locale === 'ru-RU' ? 'О нас' : 'About us'}
      description={
        router.locale === 'ru-RU'
          ? 'Информация о макетной студии Спутник'
          : 'About Sputnik maket studio'
      }
      keywords='макеты,сувенирные макеты, макеты космических аппаратов'
    >
      <h1>About</h1>
    </Layout>
  )
}

export default About
