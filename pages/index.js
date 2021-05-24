import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '@/components/Layout'
import CardsHolder from '@/components/CardsHolder'
import SideMenu from '@/components/SideMenu'
import { API_URL, NEXT_URL } from '../config/index.js'
import styles from '../styles/Home.module.css'

const Home = ({ categories }) => {
  return (
    <Layout
      title='Спутник'
      keywords='макеты ракет, макеты на заказ'
      description='Макетная студия Спутник'
    >
      <div className='col-3'>
        <SideMenu categories={categories} />
      </div>
      <div className='col-9'>
        <CardsHolder />
      </div>
    </Layout>
  )
}
export default Home

export const getServerSideProps = async () => {
  const res = await axios.get(`${API_URL}categories?select=slug,name`)
  return {
    props: {
      categories: res.data.data,
    },
  }
}
