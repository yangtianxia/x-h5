import { unref, type Ref, type CSSProperties } from 'vue'
import { isNumeric, isInteger, isArray } from '@txjs/bool'

export const addUnit = (value?: Numeric) => {
  if (isNumeric(value)) {
    return `${value}px`
  }

  return value
}

export const isHidden = (elRef: HTMLElement | Ref<HTMLElement | undefined>) => {
  const el = unref(elRef)

  if (!el) {
    return false
  }

  const style = window.getComputedStyle(el)
  const hidden = style.display === 'none'
  const parentHidden = el.offsetParent === null && style.position !== 'fixed'

  return hidden || parentHidden
}

export const getSizeStyle = (originSize?: Numeric | Numeric[]): CSSProperties | undefined => {
  const style = {} as CSSProperties

  if (isArray(originSize)) {
    style.width = addUnit(originSize[0])
    style.height = addUnit(originSize[1])
  } else if (isNumeric(originSize)) {
    const size = addUnit(originSize)
    style.width = size
    style.height = size
  }

  return style
}

export const getZIndexStyle = (zIndex?: Numeric) => {
  const style = {} as CSSProperties

  if (isInteger(zIndex)) {
    style.zIndex = zIndex
  }

  return style
}
