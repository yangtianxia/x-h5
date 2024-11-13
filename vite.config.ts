import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import Viewport from 'postcss-mobile-forever'
import Autoprefixer from 'autoprefixer'
import Vue from '@vitejs/plugin-vue'
import VueJSX from '@vitejs/plugin-vue-jsx'
import Legacy from '@vitejs/plugin-legacy'
import Inject from '@rollup/plugin-inject'
import { pick } from '@txjs/shared'
import Imp from 'vite-plugin-imp'
import { createHtmlPlugin } from 'vite-plugin-html'
import ejs from 'ejs'
import { version } from './package.json'
import { token } from './theme.mjs'

const resolve = (path: string) => {
  return fileURLToPath(new URL(path, import.meta.url))
}

const getVantApiMap = () => {
  const apiMap = new Map<string, string>()

  const api = {
    dialog: [
      'show-dialog',
      'close-dialog',
      'show-confirm-dialog',
      'set-dialog-default-options',
      'reset-dialog-default-options'
    ],
    'image-preview': ['show-image-preview'],
    notify: [
      'show-notify',
      'close-notify',
      'set-notify-default-options',
      'reset-notify-default-options'
    ],
    toast: [
      'show-toast',
      'close-toast',
      'show-fail-toast',
      'show-loading-toast',
      'show-success-toast',
      'allow-multiple-toast',
      'set-toast-default-options',
      'reset-toast-default-options'
    ]
  }

  Object.entries(api).forEach(([importName, apiList]) => {
    apiList.forEach((api) => {
      apiMap.set(api, importName)
    })
  })

  return apiMap
}

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'
  const env = loadEnv(mode, process.cwd())
  const vantApi = getVantApiMap()

  return {
    server: {
      hmr: true,
      proxy: {
        [env.VITE_PROXY_API]: {
          target: env.VITE_API,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^${env.VITE_PROXY_API}`), '')
        }
      }
    },
    resolve: {
      alias: {
        '~': resolve('./'),
        '@': resolve('./src')
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          math: 'always',
          relativeUrls: true,
          javascriptEnabled: true,
          charset: false,
          additionalData: `@import "./src/variables.less";`,
          modifyVars: {
            '@prefix': env.VITE_PREFIX
          }
        }
      },
      modules: {
        auto: true,
        generateScopedName: `${isDev ? '[local]_' : ''}[hash:base64:8]`,
        globalModulePaths: [/\.module\.[sc|sa|le|c]ss$/i]
      },
      postcss: {
        plugins: [
          Viewport({
            appSelector: '#app',
            viewportWidth: 375,
            propList: ['*'],
            unitPrecision: 3,
            maxDisplayWidth: 600,
            valueBlackList: ['1px'],
            rootContainingBlockSelectorList: [
              'van-tabbar',
              'van-popup',
            ],
            border: true,
            mobileUnit: 'vw'
          }),
          Autoprefixer()
        ]
      }
    },
    build: {
      minify: 'terser'
    },
    plugins: [
      Vue(),
      VueJSX({
        isCustomElement: (tag) => tag.startsWith('wx-')
      }),
      Legacy(),
      Inject({
        BEM: '@txjs/bem'
      }),
      Imp({
        libList: [
          {
            libName: 'vant',
            replaceOldImport: false,
            style: (name) => {
              if (vantApi.has(name)) {
                name = vantApi.get(name)!
              }
              return `vant/es/${name}/style`
            }
          }
        ]
      }),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            ...pick(env, ['VITE_TITLE', 'VITE_KEYWORD', 'VITE_DESCRIPTION']),
            DATE_NOW: Date.now(),
            CURRENT_VERSION: version
          },
          tags: [
            {
              injectTo: 'head',
              tag: 'meta',
              attrs: {
                name: 'version',
                content: `${version},${Date.now()}`
              }
            },
            {
              injectTo: 'head',
              tag: 'title',
              children: env['VITE_TITLE']
            },
            {
              injectTo: 'head',
              tag: 'meta',
              attrs: {
                name: 'keyword',
                content: env['VITE_KEYWORD']
              }
            },
            {
              injectTo: 'head',
              tag: 'meta',
              attrs: {
                name: 'description',
                content: env['VITE_DESCRIPTION']
              }
            },
            {
              injectTo: 'head',
              tag: 'style',
              attrs: { type: 'text/css' },
              children: ejs.render(
                ejs
                .fileLoader(resolve('node_modules/pollen-css/dist/pollen.css'))
                .toString()
                // 删除头部注释内容
                .replace(/\/\*([\s\S]*?)\*\//g, ''),
                {},
                { cache: false }
              ) as string
            },
            {
              injectTo: 'body',
              tag: 'script',
              attrs: {
                type: 'text/javascript'
              },
              children: `window.themeVars = ${JSON.stringify(token)}`
            }
          ]
        }
      })
    ]
  }
})
