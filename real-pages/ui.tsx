import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'

// import Layout from '../components/layout/Layout'
import Title from '../components/Title'
import Counter from '../components/Counter'
import useStore from '../lib/store'

const UI: NextPage = () => {

  const { count, increment, decrement } = useStore()

  const shared = [
    'zustand',
    '@chakra-ui/react',
    '@chakra-ui/theme-tools',
    '@chakra-ui/system',
    '@chakra-ui/icons',
    '@emotion/react',
    '@emotion/styled',
  ]

  return (
    <>
      <Head>
        <title>UI</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Title text="UI Page from UI remote" />
        <pre>{JSON.stringify(shared, null, 2)}</pre>
        <Counter count={count} onIncrement={increment} onDecrement={decrement} />
      </main>
    </>
  )
}

UI.getInitialProps = async () => {
  return {};
}

export default UI
