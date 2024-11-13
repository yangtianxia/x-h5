const createKey = <T extends string>(key: T) => `${import.meta.env.VITE_PREFIX}_h5_${key}` as const

/** 用户凭证 */
export const TOKEN_KEY = createKey('token')

/** 网站语言 */
export const LOCALE_KEY = createKey('locale')

/** 重定向URL */
export const REDIRECT_URI = createKey('redirect_uri')

/** 重定向PARAMS */
export const REDIRECT_PARAMS = createKey('redirect_params')
