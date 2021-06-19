import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Layout from '@/components/Layout'
const ContactMap = dynamic(() => import('@/components/ContactMap'), {
  ssr: false,
})
const Contacts = () => {
  const router = useRouter()
  return (
    <Layout
      title={router.locale === 'ru-RU' ? 'Контактная информация' : 'Contacts'}
      description={
        router.locale === 'ru-RU'
          ? 'Контактная информация макетной студии Спутник'
          : 'Sputnik studio contacts'
      }
      keywords='контакты, спутник макеты, макеты на заказ, model studio sputnik'
    >
      <ContactMap />
    </Layout>
  )
}

export default Contacts
