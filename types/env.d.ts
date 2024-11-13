/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 全局前缀 */
  VITE_PREFIX: string
  /** 网站标题 */
  VITE_TITLE: string
  /** 网站关键词 */
  VITE_KEYWORD: string
  /** 网站描述 */
  VITE_DESCRIPTION: string
  /** 版权所有 */
  VITE_COPYRIGHT: string
  /** 接口地址 */
  VITE_API: string
  /** 接口代理地址 */
  VITE_PROXY_API: string
}

interface ImportMeta {
  readonly env: Readonly<ImportMetaEnv>
}
