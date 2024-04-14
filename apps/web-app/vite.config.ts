import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import { config } from '@repo/app-config'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  base: config.webApp.path,
  plugins: [
    react(),
    svgr(),
    federation({
      name: config.appName,
      remotes: {
        findIssue: 'http://localhost:8081/web/ppe-web-find-issue/assets/remoteEntry.js'
      },
      exposes: {},
      shared: ['react', 'react-dom', 'react-router-dom', 'zustand', '@tanstack/react-query']
    })
  ],
  server: {
    port: config.webApp.port,
    strictPort: true,
    open: true,
    host: 'localhost',
    proxy: {
      [config.bff.api.path]: {
        target: config.bffMock.url,
        rewrite: (path: string) => path.replace(config.bff.api.path, '/graphql')
      },
      [config.auth.api.path]: {
        target: config.authMock.url,
        rewrite: (path: string) => path.replace(config.auth.api.path, '/')
      }
    }
  },

  preview: {
    port: config.webApp.port,
    strictPort: true,
    open: false,
    host: true,
    proxy: {
      [config.auth.api.path]: {
        target: config.authMock.url,
        rewrite: (path: string) => path.replace(config.auth.api.path, '/')
      }
    },
    [config.findIssueBff.api.path]: {
      target: config.bffMock.url,
      rewrite: (path: string) => path.replace(config.findIssueBff.api.path, '/')
    }
  },

  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})
