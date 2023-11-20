export default async (location: string) => {
  const runtimeConfig = useRuntimeConfig()
  const KEY_API_MAP = runtimeConfig.public.KEY_API_MAP
  const url = `https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json`
  // const auth = useAuth()
  // const token = auth.$storage.getUniversal('_token.local') as string
  const { data, error } = await useFetch(url)
  if (error.value) {
    // console.log(error.value)
    throw createError({
      ...error.value,
      statusMessage: `Could not fetch data from ${url}`
    })
  }
  return data
}
