import { Response } from '~/types/Response'
import { Post } from '~/types/Post'

type ResponsePostList = Response & {
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
    let errorMessage = {
      ...error.value,
      message: `Could not fetch data from ${url}`
    }
    if (error.value.statusCode === 500) {
      errorMessage.message = 'เกิดข้อผิดพลาดเซิร์ฟเวอร์ภายใน'
    } else if (error.value.statusCode === 404) {
      errorMessage.message = `Post id ${id} not found`
    }
    throw createError(errorMessage)
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

export async function deletePost(id: string) {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}posts/${id}`
  // const auth = useAuth()
  // const token = auth.$storage.getUniversal('_token.local') as string
  const { data, error } = await useFetch(url, {
    // headers: {
    //   Authorization: token,
    // },
    method: 'DELETE'
  })

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: `Could not fetch data from ${url}`
    })
  }

  return data
}

export async function updatePost(postId: string, editPost: any) {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}posts/${postId}`
  // const auth = useAuth()
  // const token = auth.$storage.getUniversal('_token.local') as string
  const { data, error } = await useFetch(url, {
    headers: {
      // Authorization: token,
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(editPost)
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
