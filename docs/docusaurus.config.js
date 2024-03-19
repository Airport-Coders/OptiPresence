import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'Airport Coders',
	tagline: 'Airport Coders',
	favicon: 'img/logo.png',

	// Set the production url of your site here
	url: 'https://airport-coders.github.io/',
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: '/optimism/',

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: 'Airport Coders', // Usually your GitHub org/user name.
	projectName: 'docusaurus', // Usually your repo name.

	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',

	// Even if you don't use internationalization, you can use this field to set
	// useful metadata like html lang. For example, if your site is Chinese, you
	// may want to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},

	presets: [
		[
			'classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					routeBasePath: '/',
				},
				theme: {
					customCss: './src/css/custom.css',
				},
			}),
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			// Replace with your project's social card
			image: 'img/docusaurus-social-card.jpg',
			navbar: {
				title: 'Home',

				logo: {
					alt: 'Home Logo',
					src: 'img/logo.png',
				},
				items: [
					{
						to: 'category/setup',
						label: 'Setup',
						position: 'left',
					},
				],
			},
			footer: {
				style: 'dark',
				links: [
					{
						title: 'Docs',
						items: [
							{
								to: '/',
								label: 'Introduction',
							},
							{
								to: 'category/setup',
								label: 'Setup',
							},
						],
					},
				],
				copyright: `Copyright © ${new Date().getFullYear()} Airport Coders, Inc. Built with Docusaurus.`,
			},
			prism: {
				theme: prismThemes.github,
				darkTheme: prismThemes.dracula,
				additionalLanguages: ['bash', 'diff', 'json'],
			},
		}),
};

export default config;
