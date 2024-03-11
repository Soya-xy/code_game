import dayjs from 'dayjs'

const DEFAULT_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function formatTime(t: Date, fmt?: string) {
  return t ? dayjs(t).format(fmt || DEFAULT_TIME_FORMAT) : ''
}

// 数字转换A-Z
export function numToAZ(num: number) {
  return String.fromCharCode(65 + num)
}

export function imgUrl(imagePath: string) {
  let path = ''
  if (import.meta.env.MODE !== 'development') {
    const metaUrl = new URL(import.meta.url) // 获取当前模块的 URL
    const metaUrlMatch = metaUrl.pathname.match(/^(.*?)\/public\//) // 匹配public前面的路径
    if (metaUrlMatch && metaUrlMatch[1])
      path = metaUrlMatch[1]
  }

  return path
}
