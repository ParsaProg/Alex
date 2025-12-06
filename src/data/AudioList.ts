
export const audioList = Array.from({ length: 129 }, (_, i) => ({
  id: i + 1,
  page: i + 8,
  fileName: `${i + 8}.mp3`,
  audioPath: `/audios/${i + 8}.mp3`,
}));