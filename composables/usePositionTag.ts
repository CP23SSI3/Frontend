import { ResponseList } from '~/types/Response'
import { PositionTag } from '~/types/Post'

// type ResponsePositionTagList = ResponseList & {
//   data: PositionTag[]
// }

// type ResponsePositionTagList = PositionTag[]

export default async () => {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}position-tags`
  // const auth = useAuth()
  // const token = auth.$storage.getUniversal('_token.local') as string
  const { data, error } = await useFetch<PositionTag[]>(url, {
    // params,
    // headers: {
    // Authorization: token
    //   content: 'application/json'
    // }
  })
  if (error.value) {
    // console.log(error.value)
    throw createError({
      ...error.value,
      statusMessage: `Could not fetch data from ${url}`
    })
  }
  return data
}
