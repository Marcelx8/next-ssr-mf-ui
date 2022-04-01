const { withFederatedSidecar } = require('@module-federation/nextjs-ssr');
const withPlugins = require('next-compose-plugins');

const name = 'ui';
const exposes = {
  './Counter': './components/Counter.tsx',
  './Title': './components/Title.tsx',
  './Nav': './components/Nav.tsx',
  './OldNav': './components/OldNav.tsx',
  './store': './lib/store.ts',
  './theme': './theme/index.tsx',
  './ThemeProvider': './shared/index.tsx',
  './ui': './realPages/index.tsx',
  './pages-map': './pages-map.ts',
};

const remotes = (isServer) => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    ui: process.env.VERCEL_URL
    ? `ui@https://module-federation-nextjs-ssr-ui.vercel.app/_next/static/${location}/remoteEntry.js`
    : `ui@http://localhost:3003/_next/static/${location}/remoteEntry.js`,
  };
};

const nextConfig = {
  env: {
    VERCEL: process.env.VERCEL,
    VERCEL_URL: process.env.VERCEL_URL,
  },

  webpack(config, options) {
    const { webpack, isServer } = options;
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
