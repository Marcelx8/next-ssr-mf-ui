import React from 'react';
import Document, { Html, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';
import { flushChunks, ExtendedHead, revalidate, DevHotScript } from '@module-federation/nextjs-ssr/flushChunks';
import { ColorModeScript } from '@chakra-ui/react';

export type MyDocumentInitialProps = DocumentInitialProps & {
  remoteChunks: Promise<any[]>;
};

class MyDocument extends Document<MyDocumentInitialProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<MyDocumentInitialProps> {
    ctx?.res?.on('finish', () => {
      revalidate();
    });

    const remotes = await flushChunks(process.env.REMOTES);
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      remoteChunks: remotes,
    };
  }

  render() {
    return (
      <Html>
        <ExtendedHead>
          <meta name="robots" content="noindex" />
          <link rel="icon" href="/favicon.ico" />
          {Object.values(this.props.remoteChunks)}
        </ExtendedHead>
        <DevHotScript />
        <body style={{ marginLeft: '1.25rem' }}>
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
