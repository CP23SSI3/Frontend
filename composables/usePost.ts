import { ResponseList } from '~/types/Response'
import { Post } from '~/types/Post'

type ResponsePostList = ResponseList & {
  data: {
    content: Post[]
  }
}

export default async () => {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}posts`
  // const auth = useAuth()
  // const token = auth.$storage.getUniversal('_token.local') as string
  const { data, error } = await useFetch(url, {
    // params,
    // headers: {
    //   Authorization: token,
    // },
  })
  console.log(data.value)
  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: `Could not fetch data from ${url}`
    })
  }
  return data
}
