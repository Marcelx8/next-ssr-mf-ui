import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'

import Layout from '../components/layout/Layout'
import Title from '../components/Title'
// const Layout = dynamic(() => import('ui/Layout'))
// const Title = dynamic(() => import('ui/Title'))

const UI: NextPage = (ctx) => {

  return (
    <>
      <Head>
        <title>UI</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <Title text="UI" />
          {/* <Counter count={count} onIncrement={increment} onDecrement={decrement} /> */}
        </Layout>
      </main>
    </>
  )
}

UI.getInitialProps = async (ctx) => {
  return { ctx };
}

export default UI
