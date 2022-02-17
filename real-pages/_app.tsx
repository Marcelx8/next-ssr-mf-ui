import type { AppContext, AppProps } from 'next/app'
import App from 'next/app';
import dynamic from 'next/dynamic';
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme/theme'

import { loadNavData, NavProps } from "../data/nav";

// const Nav = (await import('ui/Nav')).default
const Nav = dynamic(() => import('../fed-components/uiNav'))
// import Nav from '../components/Nav'

interface AppShellProps extends AppProps {
  navData: NavProps
}

const MyApp = ({ Component, pageProps, navData }: AppShellProps) => {

  return (
    <>
      <ChakraProvider resetCSS={true} theme={theme}>
        <Nav navItems={navData.navItems} />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const [appProps, navData] = await Promise.all([
    App.getInitialProps(appContext),
    loadNavData()
  ]);

  const props = { ...appProps, navData };

  if (typeof window === "undefined") {
    if (appContext.ctx.res) {
      appContext.ctx.res.setHeader(
        "Cache-Control",
        "s-maxage=1, stale-while-revalidate"
      );
    }
  }

  return props;
};

export default MyApp;
