export const winOpen = (url: string) => {
  const a = document.createElement('a')
  a.target = '_blank'
  a.href = url
  a.click()
}