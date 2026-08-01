import { chromium } from 'playwright'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outputDir = path.resolve(__dirname, '../screenshots')
const baseUrl = 'http://localhost:5173'

const pages = [
  {
    name: 'home',
    url: '/',
    waitFor: '.trending-section, .home-header',
  },
  {
    name: 'profile',
    url: '/users/karpathy',
    waitFor: '.profile-sidebar, .profile-hero',
  },
  {
    name: 'repository',
    url: '/repos/facebook/react',
    waitFor: '.repository-header, .repository-mobile-hero',
  },
]

const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 2,
})

for (const pageConfig of pages) {
  const page = await context.newPage()

  await page.goto(`${baseUrl}${pageConfig.url}`, { waitUntil: 'networkidle' })

  try {
    await page.waitForSelector(pageConfig.waitFor, { timeout: 15000 })
  } catch {
    await page.waitForTimeout(3000)
  }

  await page.screenshot({
    path: path.join(outputDir, `${pageConfig.name}.png`),
    fullPage: true,
  })

  await page.close()
  console.log(`Saved ${pageConfig.name}.png`)
}

await browser.close()
