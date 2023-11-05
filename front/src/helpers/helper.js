import dayjs from 'dayjs'

export const getTranslation = (key, defaultTranslation) => {
  return (
    {
      'offer': 'Offre',
      'spontaneous-candidacy': 'Canditature spontanée'
    }[key] ||
    defaultTranslation ||
    key
  )
}

export const date = (dateStr) => {
  const dateDayjs = dayjs(dateStr)
  return dateDayjs.isValid() ? dateDayjs.format('DD/MM/YYYY') : dateStr
}