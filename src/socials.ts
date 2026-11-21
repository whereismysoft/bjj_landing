export const socials = {
  telegram: 'https://t.me/PashaChelust',
  vk: 'https://vk.me/kakdelabanditi',
  youtube: 'https://youtube.com/@pashachelust',
}

export function youtubeVideoUrl(id: string) {
  return `https://www.youtube.com/watch?v=${encodeURIComponent(id)}`
}
