import dynamic from 'next/dynamic';
const page = import('../real-pages/index')

const Page = dynamic(() => import('../real-pages/index'))
// @ts-ignore
Page.getInitialProps = async (ctx: any) => {
  const getInitialProps = (await page).default?.getInitialProps;
  if (getInitialProps) {
    return getInitialProps(ctx)
  }
  return {}
}

export default Page