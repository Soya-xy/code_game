import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Inspector from 'vite-plugin-vue-inspector'
import Unocss from 'unocss/vite'
import vuetify from 'vite-plugin-vuetify'

// import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import autoprefixer from 'autoprefixer'
import VueMacros from 'unplugin-vue-macros/vite'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  plugins: [
    VueMacros({
      plugins: {
        vue: Vue(),
      },
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue'],
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue/macros',
        '@vueuse/core',
        'pinia',
        { '@arco-design/web-vue': ['Message', 'Modal'] },
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/composables',
        'src/stores',
        'src/api',
      ],
      resolvers: [],
      vueTemplate: true,
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      dts: 'src/components.d.ts',
      directoryAsNamespace: true,
      resolvers: [
        // ArcoResolver({
        //   importStyle: 'less',
        //   resolveIcons: true,
        // }),
      ],
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),

    // https://github.com/webfansplz/vite-plugin-vue-inspector
    Inspector({
      toggleButtonVisibility: 'never',
    }),

    vuetify({
      styles: {
        configFile: 'src/assets/styles/settings.scss',
      },
    }),
  ],
  server: {
    host: '0.0.0.0',
  },
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
  // https://github.com/vitest-dev/vitest
  test: {
    include: ['test/**/*.test.ts'],
    environment: 'jsdom',
    deps: {
      inline: ['@vue', '@vueuse', 'vue-demi'],
    },
  },

})
