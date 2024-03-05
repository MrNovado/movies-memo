/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MAIN_VITE_TMDB_API_KEY: string;
  readonly MAIN_VITE_TMDB_API_READ_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
