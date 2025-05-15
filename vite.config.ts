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
      external: ['lit', 'lit/decorators.js'],
      output: {
        globals: {
          lit: 'Lit',
          'lit/decorators.js': 'LitDecorators'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 's10k-conversational-agent.css';
          return assetInfo.name;
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