/**
 * Generate black-and-white QR codes for every work project.
 *
 * Outputs:
 *   public/qr/classic/{slug}_{ro|usa}_{category}.png
 *   public/qr/bauhaus/{slug}_{ro|usa}_{category}.png
 *
 * Paths match work nav: /work/{romania|usa}/{category}/{slug}
 *
 * Usage: node scripts/generate-project-qrs.mjs
 */
import QRCode from 'qrcode'
import sharp from 'sharp'
import { mkdir, writeFile } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import ro from '../src/assets/ro.json' with { type: 'json' }

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const BASE = process.env.QR_BASE_URL ?? 'https://haralamb-georgescu.ro'
const SIZE = 800
const INK = '#111111'
const PAPER = '#ffffff'

const PERIOD_LABEL = { a: 'ro', b: 'usa' }
const PERIOD_PATH = { a: 'romania', b: 'usa' }

function projectUrl(project) {
  const period = PERIOD_PATH[project.period] ?? 'romania'
  return `${BASE}/work/${period}/${project.category}/${project.slug}`
}

function fileBase(project) {
  const region = PERIOD_LABEL[project.period] ?? 'ro'
  return `${project.slug}_${region}_${project.category}`
}

async function classicPng(url) {
  return QRCode.toBuffer(url, {
    errorCorrectionLevel: 'H',
    type: 'png',
    width: SIZE,
    margin: 2,
    color: { dark: INK, light: PAPER },
  })
}

async function bauhausPng(url) {
  const qr = await QRCode.create(url, { errorCorrectionLevel: 'H' })
  const modules = qr.modules
  const n = modules.size
  const quiet = 4
  const total = n + quiet * 2
  const cell = Math.floor(SIZE / total)
  const canvas = cell * total
  const offset = Math.floor((SIZE - canvas) / 2)

  const isFinder = (x, y) =>
    (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7)
  const isTiming = (x, y) => y === 6 || x === 6
  const isAlignment = (x, y) => {
    if (n < 25) return false
    const ax = n - 7
    const ay = n - 7
    return Math.abs(x - ax) <= 2 && Math.abs(y - ay) <= 2
  }

  const parts = [`<rect width="${SIZE}" height="${SIZE}" fill="${PAPER}"/>`]

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (!modules.get(x, y)) continue
      const px = offset + (x + quiet) * cell
      const py = offset + (y + quiet) * cell
      const cx = px + cell / 2
      const cy = py + cell / 2

      if (isFinder(x, y)) {
        parts.push(
          `<rect x="${px}" y="${py}" width="${cell}" height="${cell}" fill="${INK}"/>`,
        )
      } else if (isTiming(x, y)) {
        parts.push(
          `<circle cx="${cx}" cy="${cy}" r="${cell * 0.38}" fill="${INK}"/>`,
        )
      } else if (isAlignment(x, y)) {
        const inset = cell * 0.12
        parts.push(
          `<rect x="${px + inset}" y="${py + inset}" width="${cell - inset * 2}" height="${cell - inset * 2}" fill="${INK}"/>`,
        )
      } else {
        parts.push(
          `<circle cx="${cx}" cy="${cy}" r="${cell * 0.42}" fill="${INK}"/>`,
        )
      }
    }
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">${parts.join('')}</svg>`
  return sharp(Buffer.from(svg)).png().toBuffer()
}

const classicDir = join(ROOT, 'public/qr/classic')
const bauhausDir = join(ROOT, 'public/qr/bauhaus')
await mkdir(classicDir, { recursive: true })
await mkdir(bauhausDir, { recursive: true })

const projects = ro.projects
let done = 0
const concurrency = 8
const queue = [...projects]

async function worker() {
  while (queue.length) {
    const project = queue.shift()
    if (!project?.slug || !project.category || !project.period) continue
    const url = projectUrl(project)
    const name = `${fileBase(project)}.png`
    const [classic, bauhaus] = await Promise.all([classicPng(url), bauhausPng(url)])
    await Promise.all([
      writeFile(join(classicDir, name), classic),
      writeFile(join(bauhausDir, name), bauhaus),
    ])
    done++
    if (done % 20 === 0 || done === projects.length) {
      console.log(`Generated ${done}/${projects.length}`)
    }
  }
}

await Promise.all(Array.from({ length: concurrency }, () => worker()))
console.log(`Done. Base URL: ${BASE}`)
console.log(`Wrote ${projects.length} classic + ${projects.length} bauhaus QRs`)
