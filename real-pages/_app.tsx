import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import React, { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/provider';
import theme from '../theme/index';
import remotes from '../remotes'
import navData from '../data/nav';

import type { NavItem } from "../data/nav";

import Nav from '../components/Nav'

type MyAppProps = AppProps & {
  navItems: NavItem[],
}

const MyApp = ({ Component, pageProps, navItems }: MyAppProps) => {

  return (
    <>
      <ChakraProvider resetCSS theme={theme}>
        <Nav navItems={navItems} />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const [appProps, navItems] = await Promise.all([
    App.getInitialProps(appContext),
    navData
    // typeof window !== "undefined"
    //   // @ts-ignore
    //   ? __NEXT_DATA__.props.navData
    //   : fetch(`${remotes.ui.apiPath}/nav`).then((res) => {
    //     return res.json()
    //   })
  ]);

  const props = { ...appProps, navItems };

  return props;
};

export default MyApp;
