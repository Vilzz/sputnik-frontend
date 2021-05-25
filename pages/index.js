import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '@/components/Layout'

import styles from '../styles/Home.module.css'

const Home = ({ categories }) => {
  return (
    <Layout
      title='Спутник'
      keywords='макеты ракет, макеты на заказ'
      description='Макетная студия Спутник'
    >
      <h1>Главная</h1>
    </Layout>
  )
}
export default Home
