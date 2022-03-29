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
  './theme': './theme/index.tsx',
  './ThemeProvider': './shared/index.tsx',
  './ui': './realPages/index.tsx',
  './pages-map': './pages-map.ts',
};
// this enables you to use import() and the webpack parser
// loading remotes on demand, not ideal for SSR
const remotes = (isServer) => {
  // const localhost = `http://localhost:${process.env.PORT}`;
  const localhost = `http://localhost:3003`;
  const location = `/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`;

  return {
    ui: `ui@${localhost}${location}`,
    // ui: process.env.NODE_ENV === 'production' ? `ui@http://localhost:${process.env.PORT}/?` : `ui@http://localhost:${process.env.PORT}/_next/static/${location}/remoteEntry.js?`,
  };
};

const nextConfig = {
  env: {
    VERCEL: process.env.VERCEL,
    VERCEL_URL: process.env.VERCEL_URL,
  },

  webpack(config) {
    config.module.rules.push({
      test: [/_app.[jt]sx?/, /_document.[jt]sx?/],
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
          // 'zustand/': {
          //   requiredVersion: false,
          //   singleton: true,
          //   import: 'zustand',
          // },
          // '@chakra-ui/react/': {
          //   requiredVersion: false,
          //   singleton: true,
          //   import: '@chakra-ui/react',
          //   shareKey: '@chakra-ui/react',
          // },
          // '@chakra-ui/theme-tools/': {
          //   requiredVersion: false,
          //   singleton: true,
          //   import: '@chakra-ui/theme-tools',
          //   shareKey: '@chakra-ui/theme-tools',
          // },
          // '@chakra-ui/system/': {
          //   requiredVersion: false,
          //   singleton: true,
          //   import: '@chakra-ui/system',
          //   shareKey: '@chakra-ui/system',
          // },
          // '@chakra-ui/icons/': {
          //   requiredVersion: false,
          //   singleton: true,
          //   import: '@chakra-ui/icons',
          //   shareKey: '@chakra-ui/icons',
          // },
          // '@emotion/react/': {
          //   requiredVersion: false,
          //   singleton: true,
          //   import: '@emotion/react',
          //   shareKey: '@emotion/react',
          // },
          // '@emotion/styled/': {
          //   requiredVersion: false,
          //   singleton: true,
          //   import: '@emotion/styled',
          //   shareKey: '@emotion/styled',
          // },
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
  nextConfig
);
