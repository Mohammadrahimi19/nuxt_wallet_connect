// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  ssr: false,

  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },

  css: ["~/assets/css/main.scss"],

  modules: [
    '@nuxtjs/i18n',
    "@nuxt/scripts",
    "@nuxt/ui",
    "@wagmi/vue/nuxt",
  ],

  i18n: {
    locales: [
      { code: 'en', name: 'English', file: 'en.json', dir: 'ltr' },
      { code: 'fa', name: 'فارسی', file: 'fa.json', dir: 'rtl' }
    ],
    defaultLocale: 'en',
    langDir: '../app/locales',
    strategy: 'no_prefix', // یا 'prefix' اگر می‌خواهید /en و /fa در URL باشد
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  runtimeConfig: {
    public: {
      projectId: "82672faa9189ce31e12460717a52960e",
    },
  },

  app: {
    head: {
     

      titleTemplate: "WALLET",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "DApp برای اتصال به MetaMask و سواپ توکن‌ها",
        },
        { property: "og:site_name", content: "My DApp" },
        { property: "og:type", content: "website" },
      ],
      link: [
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css' },
        { rel: "icon", type: "image/png", href: "/favicon.png" }
      ],
    },
  },

  robots: { rules: [{ userAgent: "*", allow: "/" }] },

  ui: {
    prefix: "Nuxt",
    icons: {
      arrowDown: "i-lucide-arrow-down",
      arrowLeft: "i-lucide-arrow-left",
      arrowRight: "i-lucide-arrow-right",
      arrowUp: "i-lucide-arrow-up",
      caution: "i-lucide-circle-alert",
      check: "i-lucide-check",
      chevronDoubleLeft: "i-lucide-chevrons-left",
      chevronDoubleRight: "i-lucide-chevrons-right",
      chevronDown: "i-lucide-chevron-down",
      chevronLeft: "i-lucide-chevron-left",
      chevronRight: "i-lucide-chevron-right",
      chevronUp: "i-lucide-chevron-up",
      close: "i-lucide-x",
      copy: "i-lucide-copy",
      copyCheck: "i-lucide-copy-check",
      dark: "i-lucide-moon",
      ellipsis: "i-lucide-ellipsis",
      error: "i-lucide-circle-x",
      external: "i-lucide-arrow-up-right",
      eye: "i-lucide-eye",
      eyeOff: "i-lucide-eye-off",
      file: "i-lucide-file",
      folder: "i-lucide-folder",
      folderOpen: "i-lucide-folder-open",
      hash: "i-lucide-hash",
      info: "i-lucide-info",
      light: "i-lucide-sun",
      loading: "i-lucide-loader-circle",
      menu: "i-lucide-menu",
      minus: "i-lucide-minus",
      panelClose: "i-lucide-panel-left-close",
      panelOpen: "i-lucide-panel-left-open",
      plus: "i-lucide-plus",
      reload: "i-lucide-rotate-ccw",
      search: "i-lucide-search",
      stop: "i-lucide-square",
      success: "i-lucide-circle-check",
      system: "i-lucide-monitor",
      tip: "i-lucide-lightbulb",
      upload: "i-lucide-upload",
      warning: "i-lucide-triangle-alert",
    },
    safelistColors: ["primary", "secondary", "success", "danger"],
  },

  image: { format: ["webp", "avif"], quality: 80 },
});
