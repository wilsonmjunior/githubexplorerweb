import axios from 'axios'

export function isAbortError(error: unknown): boolean {
  if (axios.isCancel(error)) {
    return true
  }

  if (axios.isAxiosError(error) && error.code === 'ERR_CANCELED') {
    return true
  }

  return error instanceof DOMException && error.name === 'AbortError'
}
