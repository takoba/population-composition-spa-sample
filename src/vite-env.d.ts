/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly API_ORIGIN: string
  readonly API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
