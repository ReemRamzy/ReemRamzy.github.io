import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// GitHub project pages are served from /<repository-name>/.
// GitHub user pages (username.github.io) and local development use /.
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const repositoryOwner = process.env.GITHUB_REPOSITORY_OWNER
const isGitHubUserSite =
  repositoryName?.toLowerCase() === `${repositoryOwner?.toLowerCase()}.github.io`

const base =
  process.env.GITHUB_ACTIONS === 'true' && repositoryName
    ? isGitHubUserSite
      ? '/'
      : `/${repositoryName}/`
    : '/'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  base,
})
