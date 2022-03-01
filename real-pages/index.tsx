import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'

// import Layout from '../components/layout/Layout'
import Title from '../components/Title'
import Counter from '../components/Counter'
import useStore from '../lib/store'
// import Title from 'ui/Title'
// const Layout = dynamic(() => import('ui/Layout'))
// const Title = dynamic(() => import('ui/Title'))


const UI: NextPage = () => {

  const {count, increment, decrement} = useStore()

  return (
    <>
      <Head>
        <title>UI</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* <Layout> */}
          <Title text="UI" />
          <Counter count={count} onIncrement={increment} onDecrement={decrement} />
        {/* </Layout> */}
      </main>
    </>
  )
}

UI.getInitialProps = async () => {
  return {};
}

export default UI
