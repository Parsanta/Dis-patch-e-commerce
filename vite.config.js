// vite.config.js
import ReactRefresh from '@vitejs/plugin-react';

export default {
  plugins: [ReactRefresh()],
  alias: {
    '@': '/src',
  },
};
