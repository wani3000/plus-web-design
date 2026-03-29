import { spawn } from 'node:child_process'
import process from 'node:process'
import { setTimeout as delay } from 'node:timers/promises'

const host = '127.0.0.1'
const port = 4173
const baseUrl = `http://${host}:${port}`
const routes = ['/', '/test2.html', '/test3.html']

const preview = spawn(
  'npm',
  ['run', 'preview', '--', '--host', host, '--port', String(port), '--strictPort'],
  {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  },
)

let shuttingDown = false

async function waitForServer(url, attempts = 40, intervalMs = 500) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, { method: 'HEAD' })
      if (response.ok) {
        return
      }
    } catch {
      // Preview is likely still starting.
    }

    await delay(intervalMs)
  }

  throw new Error(`Preview server did not become ready at ${url}`)
}

async function assertRoute(pathname) {
  const response = await fetch(`${baseUrl}${pathname}`, { method: 'HEAD' })

  if (!response.ok) {
    throw new Error(`Expected 200 for ${pathname}, received ${response.status}`)
  }
}

function stopPreview() {
  if (shuttingDown || preview.exitCode !== null) {
    return Promise.resolve()
  }

  shuttingDown = true

  return new Promise((resolve) => {
    preview.once('exit', () => resolve())
    preview.kill('SIGTERM')

    setTimeout(() => {
      if (preview.exitCode === null) {
        preview.kill('SIGKILL')
      }
    }, 2000).unref()
  })
}

try {
  await waitForServer(`${baseUrl}/`)

  for (const route of routes) {
    await assertRoute(route)
  }

  console.log(`Verified preview routes: ${routes.join(', ')}`)
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
} finally {
  await stopPreview()
}
