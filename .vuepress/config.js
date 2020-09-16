module.exports = {
  description: 'Easily deploy Smart Contract for a Standard, Capped, Mintable, Burnable Token.',
  title: 'NewAsset Generator',
  base: '/newasset-generator/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://www.newtonproject.org//newasset-generator' }],
    ['meta', { property: 'og:image', content: 'https://vittominacori.github.io/erc20-generator/assets/images/erc20-token-generator.png' }], // eslint-disable-line max-len
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'twitter:image', content: 'https://vittominacori.github.io/erc20-generator/assets/images/erc20-token-generator.png' }], // eslint-disable-line max-len
    ['meta', { property: 'twitter:title', content: 'NewAsset Generator' }],
    ['script', { src: 'assets/js/web3.min.js' }],
  ],
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        ga: 'UA-115756440-2',
      },
    ],
  ],
  defaultNetwork: 'NewChainTestNet',
};
