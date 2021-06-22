import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Layout from '@/components/Layout'
import { ImAddressBook } from 'react-icons/im'
const ContactMap = dynamic(() => import('@/components/ContactMap'), {
  ssr: false,
})
const Contacts = () => {
  const router = useRouter()
  return (
    <Layout
      title={
        router.locale === 'ru-RU' ? 'Контактная информация' : 'Contact info'
      }
      description={
        router.locale === 'ru-RU'
          ? 'Контактная информация макетной студии Спутник'
          : 'Sputnik maket studio contacts'
      }
      keywords='контакты, спутник макеты, макеты на заказ, model studio sputnik'
    >
      <h1 className='text-primary my-3 ms-3'>
        <ImAddressBook className='me-2' />
        {router.locale === 'ru-RU' ? 'Контактная информация' : 'Contact info'}
      </h1>
      <hr />
      <ContactMap locale={router.locale} />
    </Layout>
  )
}

export default Contacts
