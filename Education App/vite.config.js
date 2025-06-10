import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
// import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
// import rollupNodePolyFill from 'rollup-plugin-node-polyfills'

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       // Polyfill Node.js core modules for browser
//       util: 'rollup-plugin-node-polyfills/polyfills/util',
//       sys: 'util',
//       events: 'rollup-plugin-node-polyfills/polyfills/events',
//       stream: 'rollup-plugin-node-polyfills/polyfills/stream',
//       path: 'rollup-plugin-node-polyfills/polyfills/path',
//       querystring: 'rollup-plugin-node-polyfills/polyfills/qs',
//       punycode: 'rollup-plugin-node-polyfills/polyfills/punycode',
//       url: 'rollup-plugin-node-polyfills/polyfills/url',
//       string_decoder: 'rollup-plugin-node-polyfills/polyfills/string-decoder',
//       buffer: 'rollup-plugin-node-polyfills/polyfills/buffer',
//       process: 'rollup-plugin-node-polyfills/polyfills/process-es6',
//       // Add other aliases if needed
//     },
//   },
//   optimizeDeps: {
//     esbuildOptions: {
//       // Node.js global to browser global
//       define: {
//         global: 'globalThis',
//       },
//       plugins: [
//         NodeGlobalsPolyfillPlugin({
//           process: true,
//           buffer: true,
//         }),
//         NodeModulesPolyfillPlugin(),
//       ],
//     },
//   },
//   build: {
//     rollupOptions: {
//       plugins: [
//         rollupNodePolyFill(),
//       ],
//     },
//   },
// })
