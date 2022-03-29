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
      console.log('starting revalidation');
      revalidate({ poll: false }).then(() => {
        // might not be needed
        if (process.env.NODE_ENV === 'development') {
          setTimeout(() => {
            process.exit(1);
          }, 50);
        }
      });
    });

    const remoteChunks = await flushChunks(process.env.REMOTES);
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      remoteChunks,
    };
  }

  render() {
    return (
      <Html>
        <ExtendedHead>
          <meta name="robots" content="noindex" />
          {Object.values(this.props.remoteChunks)}
        </ExtendedHead>
        <DevHotScript />
        <body>
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
