import dynamic from 'next/dynamic';

const UI = dynamic(() => import('../real-pages/ui'));

// @ts-ignore
UI.getInitialProps = async (ctx: any) => {
  const uiImport = import('../real-pages/ui')

  const getInitialProps = (await uiImport).default?.getInitialProps;
  if (getInitialProps) {
    return getInitialProps(ctx)
  }
  return {}
}

export default UI