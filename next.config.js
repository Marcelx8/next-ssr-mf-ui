const { withFederatedSidecar } = require('@module-federation/nextjs-ssr');
const withPlugins = require('next-compose-plugins');
// const withTM = require('next-transpile-modules')(['@chakra-ui/react', '@emotion/react']); // pass the modules you would like to see transpiled

const name = 'ui';
const exposes = {
  // './Layout': './components/layout/Layout.tsx',
  // './Header': './components/layout/Header.tsx',
  './Counter': './components/Counter.tsx',
  './Title': './components/Title.tsx',
  './Nav': './components/Nav.tsx',
  './OldNav': './components/OldNav.tsx',
  './store': './lib/store.ts',
  // './ThemeProvider': './utilities/themeProvider.tsx',
  // './theme': './theme/index.tsx',
  './theme': './theme/index.ts',
  './ThemeProvider': './shared/index.ts',
  './ui': './real-pages/ui.tsx',
  './pages-map': './pages-map.ts',
};
// this enables you to use import() and the webpack parser
// loading remotes on demand, not ideal for SSR
const remotes = (isServer) => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    // shell: process.env.VERCEL_URL
    // ? `shell@https://module-federation-nextjs-ssr-example.vercel.app/_next/static/${location}/remoteEntry.js?`
    // : `shell@http://localhost:3000/_next/static/${location}/remoteEntry.js?`,
    // home: process.env.VERCEL_URL
    // ? `home@https://module-federation-nextjs-ssr-home.vercel.app/_next/static/${location}/remoteEntry.js?`
    // : `home@http://localhost:3001/_next/static/${location}/remoteEntry.js?`,
    // shell: `shell@http://localhost:3000/_next/static/${location}/remoteEntry.js?`,
    ui: `ui@http://localhost:3003/_next/static/${location}/remoteEntry.js?`,
  };
};

const nextConfig = {
  // compiler: {
  //   styledComponents: true,
  // },

  // env: {
  //   VERCEL: process.env.VERCEL,
  //   VERCEL_URL: process.env.VERCEL_URL,
  // },

  webpack(config, options) {
    const { webpack, isServer } = options;
    config.module.rules.push({
      test: /_app.tsx/,
      loader: '@module-federation/nextjs-ssr/lib/federation-loader.js',
    });

    return config;
  },
};

module.exports = withPlugins(
  [
    withFederatedSidecar(
      {
        name,
        filename: 'static/chunks/remoteEntry.js',
        exposes,
        remotes,
        shared: {
          lodash: {
            singleton: true,
          },
          'use-sse': {
            singleton: true,
          },
          'zustand/': {
            requiredVersion: false,
            singleton: true,
          },
          '@chakra-ui/react/': {
            requiredVersion: false,
            singleton: true,
          },
          '@chakra-ui/theme-tools/': {
            requiredVersion: false,
            singleton: true,
          },
          '@chakra-ui/system/': {
            requiredVersion: false,
            singleton: true,
          },
          '@chakra-ui/icons/': {
            requiredVersion: false,
            singleton: true,
          },
          '@emotion/react/': {
            requiredVersion: false,
            singleton: true,
          },
          '@emotion/styled/': {
            requiredVersion: false,
            singleton: true,
          },
        },
      },
      {
        experiments: {
          flushChunks: true,
          hot: true,
        },
      }
    ),
  ],
  nextConfig,
);
