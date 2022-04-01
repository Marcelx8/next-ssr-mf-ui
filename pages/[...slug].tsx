import dynamic from 'next/dynamic';
//@ts-ignore
const Page = dynamic(() =>
  import('../realPages/[...slug]')
);

// @ts-ignore
Page.getInitialProps = async (ctx) => {
  const page = import('../realPages/[...slug]')
  //@ts-ignore
  const getInitialProps = (await page).default?.getInitialProps;
  if (getInitialProps) {
    return getInitialProps(ctx);
  }
  return {};
};

export default Page;
