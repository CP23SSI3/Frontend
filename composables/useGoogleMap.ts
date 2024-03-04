export default async (location: string) => {
  const runtimeConfig = useRuntimeConfig()
  const KEY_API_MAP = runtimeConfig.public.KEY_API_MAP
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    location
  )}&key=${KEY_API_MAP}`
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
