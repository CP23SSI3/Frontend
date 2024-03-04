import { Response } from '~/types/Response'
import { PositionTag } from '~/types/Post'

type ResponsePositionTagList = Response & {
  data: PositionTag[]
}

export default async (params: any) => {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}position-tags`
  // const token = useToken()
  const { data, error } = await useFetch<ResponsePositionTagList>(url, {
    params
    // headers: token.getAccessToken()
    //   ? {
    //       Authorization: 'Bearer ' + token.getAccessToken()
    //     }
    //   : undefined
  })
  if (error.value) {
    console.log(error.value)
    throw createError({
      ...error.value,
      statusMessage: `Could not fetch data from ${url}`
    })
  }
  return data
}
