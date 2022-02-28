import React from "react";
import Document, { Html, Main, NextScript, DocumentContext, DocumentInitialProps } from "next/document";
import { flushChunks, ExtendedHead, revalidate, DevHotScript } from "@module-federation/nextjs-ssr/flushChunks";
// import { extractCritical } from '@emotion/server';
// import createEmotionServer from "@emotion/server/create-instance"
// import createEmotionCache from "../createEmotionCache";
// import type {MyAppProps} from '../real-pages/_app'


export type MyDocumentInitialProps = DocumentInitialProps & {
  remoteChunks: Promise<any[]>
}

class MyDocument extends Document<MyDocumentInitialProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<MyDocumentInitialProps> {

    revalidate()
    // ctx?.res?.on("finish", () => {
    //   revalidate().then(() => {
    //     setTimeout(() => {
    //       process.exit()
    //     }, 50)
    //   })
    // });

    // const originalRenderPage = ctx.renderPage;
    // const cache = createEmotionCache();
    // const { extractCriticalToChunks } = createEmotionServer(cache);

    // ctx.renderPage = () =>
    //   originalRenderPage({
    //     enhanceApp: (App) =>
    //       function EnhanceApp(props) {
    //         //@ts-ignore
    //         return <App emotionCache={cache} {...props} />
    //       }
    //   })

    const remoteChunks = await flushChunks(process.env.REMOTES);
    const initialProps = await Document.getInitialProps(ctx);
    // const styles = extractCritical(initialProps.html);
    // const emotionStyles = extractCriticalToChunks(initialProps.html);
    // const emotionStyleTags = emotionStyles.styles.map((style) => (
    //   <style
    //     data-emotion={`${style.key}`}
    //     key={style.key}
    //     // eslint-disable-next-line react/no-danger
    //     dangerouslySetInnerHTML={{ __html: style.css }}
    //   />
    // ));
    return {
      ...initialProps,
      remoteChunks,
      // styles: (
      //   <React.Fragment>
      //     {initialProps.styles}
      //     <style
      //       data-emotion-css={styles.ids.join(' ')}
      //       dangerouslySetInnerHTML={{ __html: styles.css }}
      //     />
      //   </React.Fragment>
      // ),
      // emotionStyleTags
    };
  }

  render() {
    return (
      <Html>
        <ExtendedHead>
          <meta name="robots" content="noindex" />
          {Object.values(this.props.remoteChunks)}
          {/* {this.props.emotionStyleTags} */}
        </ExtendedHead>
        <DevHotScript />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;