/**
 * Vuetify3 Plugin
 */
import { type VuetifyOptions, createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import * as labsComponents from 'vuetify/labs/components'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

// Translations provided by Vuetify
import { ar, en, es, fr, it, pt, ru, vi } from 'vuetify/locale'

import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'

// Styles
import 'vuetify/styles'
import { createI18n, useI18n } from 'vue-i18n'

import messages from '../locale'

export const i18n = createI18n({
  legacy: false, // Vuetify does not support the legacy mode of vue-i18n
  locale: localStorage.getItem('lang') || 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      ...messages.en,
      $vuetify: {
        ...en,

      },
    },
    ar: {
      ...messages.ar,
      $vuetify: {
        ...ar,

      },
    },
    es: {
      ...messages.es,
      $vuetify: {
        ...es,

      },
    },
    ru: {
      ...messages.ru,
      $vuetify: {
        ...ru,

      },
    },
    vi: {
      ...messages.vi,
      $vuetify: {
        ...vi,

      },
    },
    it: {
      ...messages.it,
      $vuetify: {
        ...it,

      },
    },
    fr: {
      ...messages.fr,
      $vuetify: {
        ...fr,

      },
    },
    pt: {
      ...messages.pt,
      $vuetify: {
        ...pt,

      },
    },
  },
})

/**
 * Vuetify Components
 *
 * @see {@link https://vuetifyjs.com/en/features/treeshaking/}
 */
let vuetifyConfig: VuetifyOptions = {
  // Global configuration
  // https://vuetifyjs.com/en/features/global-configuration/
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  // Internationalization (i18n)
  // https://vuetifyjs.com/en/features/internationalization/#internationalization-i18n
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n }),
  },
  // Theme
  // https://vuetifyjs.com/en/features/theme/
  theme: {
    defaultTheme: 'light',
  },
}

if (import.meta.env.DEV) {
  // Disable treeshaking for DEV mode.
  vuetifyConfig = {
    components: { components, labsComponents },
    directives,
    ...vuetifyConfig,
  }
}
export default createVuetify(vuetifyConfig)

// Export for test.
export { components, directives }
