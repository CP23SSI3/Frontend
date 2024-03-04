export default async (location: string) => {
  const url = `https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json`
  const { data, error } = await useFetch(url)
  if (error.value) {
    console.log(error.value)
    throw createError({
      ...error.value,
      statusMessage: `Could not fetch data from ${url}`
    })
  }
  return data
}
