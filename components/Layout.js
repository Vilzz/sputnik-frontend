import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '@/components/Header'

const Layout = ({ title, keywords, description, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>
      <Header />
      <div className='container'>{children}</div>
    </div>
  )
}

export default Layout
