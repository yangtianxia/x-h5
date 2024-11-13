import tinycolor2 from 'tinycolor2'
import { defineConfig } from 'pollen-css/utils'
import { pick } from '@txjs/shared'
import { palettes, customPalettes } from './theme.mjs'

const alphaColor = (input) => {
  const color = tinycolor2(input)
  if (color.isValid()) {
    return Object
      .values(color.toRgb())
      .slice(0, 3)
      .toString()
  }
  return input
}

const formatterColor = (palettes = {}) => {
  return Object
    .keys(palettes)
    .reduce(
      (obj, key) => {
        const value = palettes[key]
        const color = alphaColor(value)
        const rgbName = `${key}-rgb`
        obj[rgbName] = color
        obj[key] = `rgb(var(--color-${rgbName}))`
        return obj
      }, {}
    )
}

export default defineConfig((config) => {
  const modules = pick(config, ['size', 'radius', 'layer', 'line', 'weight'])

  modules.font = {
    base: 'var(--van-base-font)',
    price: 'var(--van-price-font)'
  }

  modules.size = {
    ...pick(modules.size, ['px', 'full', 'screen', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']),
    none: '0px',
    xs: '10px',
    sm: '12px',
    md: '14px',
    lg: '16px',
    xl: '18px'
  }

  modules.weight = pick(modules.weight, ['light', 'regular', 'medium', 'semibold', 'bold'])

  modules.visibility = {
    none: 0,
    1: 0.3,
    2: 0.5,
    3: 0.75,
    4: 0.85,
    5: 1
  }

  modules.duration = {
    fast: '0.2s',
    slow: '0.3s'
  }

  modules.ease = {
    in: 'ease-in',
    out: 'ease-out'
  }

  modules.color = {
    ...formatterColor(palettes),
    ...customPalettes
  }

  for (const key in config) {
    if (!modules[key]) {
      modules[key] = false
    }
  }

  return {
    modules,
    output: 'node_modules/pollen-css/dist/pollen.css'
  }
})
