import { ResponseList } from '~/types/Response'
import { Post } from '~/types/Post'

type ResponsePostList = ResponseList & {
  data: {
    number: number
    size: number
    totalPages: number
    totalElements: number
    content: Post[]
  }
}

export default async (params: any) => {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}posts`
  // const auth = useAuth()
  // const token = auth.$storage.getUniversal('_token.local') as string
  const { data, error } = await useFetch<ResponsePostList>(url, {
    params
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

type ResponsePost = Response & {
  data: Post
}
export async function getPostById(id: string) {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}posts/${id}`
  // const auth = useAuth()
  // const token = auth.$storage.getUniversal('_token.local') as string
  const { data, error } = await useFetch<ResponsePost>(url, {
    // headers: {
    //   Authorization: token
    // }
  })

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: `Could not fetch data from ${url}`
    })
  }

  return data
}

export async function createNewPost(newPost: any) {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}posts`
  // const auth = useAuth()
  // const token = auth.$storage.getUniversal('_token.local') as string
  const { data, error } = await useFetch(url, {
    headers: {
      // Authorization: token,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(newPost)
  })

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: `Could not fetch data from ${url}`
    })
  }

  return data
}
