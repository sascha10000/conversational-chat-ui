import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/s10k-conversational-agent.ts',
      name: 'S10kConversationalAgent',
      fileName: 's10k-conversational-agent',
      formats: ['es']
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          return assetInfo.name === 'style.css' ? 's10k-conversational-agent.css' : assetInfo.name || 'asset';
        }
      }
    },
    sourcemap: true,
    minify: true,
    target: 'es2020'
  },
  plugins: [
    dts({
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts'],
      outDir: 'dist',
      rollupTypes: true
    })
  ]
}); 