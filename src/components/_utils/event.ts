export const stopPropagation = (event: Event) => event.stopPropagation()

export const preventDefault = (event: Event, isStopPropagation?: boolean) => {
  event.preventDefault()

  if (isStopPropagation) {
    stopPropagation(event)
  }
}
