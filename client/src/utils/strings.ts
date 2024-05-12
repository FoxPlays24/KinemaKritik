// Функция для правильного склонения числительных
export function declOfNum(n: number, titles: string[]) {
  return titles[n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]
}

export function bufferToBase64(buffer: string) {
  return buffer && Buffer.from(buffer).toString()
}

export async function isImageFound(imageName: string) {
  return await fetch(`${process.env.SITE_URL}${imageName}`, { method: "HEAD" })
}