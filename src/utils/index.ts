/**
 * 使用a标签打开链接
 * @param url string
 */
export const winOpen = (url: string) => {
  const a = document.createElement('a')
  a.target = '_blank'
  a.href = url
  a.click()
}

/**
 * 上传附件转base64
 * @param file File
 */
export const fileToBase64 = (file: File) => {
  return new Promise<string>((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (e) {
      resolve(e.target?.result as string)
    }
    reader.onerror = function () {
      resolve('error.png')
    }
  })
}

/**
 * 获取数据类型
 * @param val any
 * @returns type
 */
export const getType = (val: any) => Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase()
