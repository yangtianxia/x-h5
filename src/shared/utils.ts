import { isNil, isNumber } from '@txjs/bool'

export const devWarn = (...args: any[]) => {
  if (import.meta.env.DEV) {
    console.warn(...args)
  }
}

export const toIOSDate = (value: string) => {
  if (value.includes('-')) {
    return value.replace(/-/g, '/')
  }
  return value
}

export function getCSSVar(input: string, alpha?: number): string
export function getCSSVar(type: string, input: string, alpha?: number): string
export function getCSSVar(inputOrType: string, inputOrAlpha?: string | number, alpha = 1) {
  let type = 'color'
  let input: string

  if (isNil(inputOrAlpha)) {
    input = inputOrType
  } else if (isNumber(inputOrAlpha)) {
    input = inputOrType
    alpha = inputOrAlpha
  } else {
    type = inputOrType
    input = inputOrAlpha
  }

  return alpha === 1 ? `var(--${type}-${input})` : `rgba(var(--${type}-${input}-rgb), ${alpha})`
}
