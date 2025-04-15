import { createRequire } from 'module'
import { defineConfig } from 'vitepress'

const require = createRequire(import.meta.url)

export default defineConfig({
  lang: 'en-US',
  title: '小易',
  description: '',

  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['meta', { name: 'theme-color', content: '#3c8772' }],
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'AZBRSFGG',
        'data-spa': 'auto',
        defer: ''
      }
    ]
  ],

  themeConfig: {
    nav: nav(),

    sidebar: {
      '/guide/': sidebarGuide(),
    },

    // editLink: {
    //   pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
    //   text: 'Edit this page on GitHub'
    // },

    socialLinks: [
      { icon: 'github', link: 'https://alexyukimura.github.io' }
    ],

    // footer: {
    //   message: 'Released under the MIT License.',
    //   copyright: 'Copyright © 2019-present Evan You'
    // },

    // algolia: {
    //   appId: '8J64VVRP8K',
    //   apiKey: 'a18e2f4cc5665f6602c5631fd868adfd',
    //   indexName: 'vitepress'
    // },

    // carbonAds: {
    //   code: 'CEBDT27Y',
    //   placement: 'vuejsorg'
    // }
  }
})

function nav() {
  return [
    { text: 'Guide', link: '/guide/test', activeMatch: '/guide/' },
  ]
}

function sidebarGuide() {
  return [
    {
      text: '项目搭建',
      collapsed: false,
      items: [
        { text: 'vitepress 搭建Blog', link: '/guide/project/blog' },
      ]
    },
  ]
}


