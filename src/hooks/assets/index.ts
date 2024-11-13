export const useAssets = (name: string) => {
  return new URL(`../../assets/image/${name}`, import.meta.url).href
}
