import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function geojsonPlugin() {
  return {
    name: 'vite-plugin-geojson',
    transform(src, id) {
      if (id.endsWith('.geojson')) {
        return {
          code: `export default ${JSON.stringify(JSON.parse(src))};`,
          map: null,
        };
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), geojsonPlugin()],
  server: {
    port: 5173,
    host: true,
  },
});
