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
  const token = useToken()
  const { data, error } = await useFetch<ResponsePostList>(url, {
    params,
    headers: token.getAccessToken()
      ? {
          Authorization: 'Bearer ' + token.getAccessToken()
        }
      : undefined
  })
  if (error.value) {
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
  const token = useToken()
  const { data, error } = await useFetch<ResponsePost>(url, {
    headers: token.getAccessToken()
      ? {
          Authorization: 'Bearer ' + token.getAccessToken()
        }
      : undefined
  })

  if (error.value) {
    let errorMessage = {
      ...error.value,
      message: `Could not fetch data from ${url}`
    }
    if (error.value.statusCode === 500) {
      errorMessage.statusMessage = 'Internal server error'
      errorMessage.message =
        'Something has gone wrong on the server hosting a website'
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
  const token = useToken()
  const { data, error } = await useFetch(url, {
    headers: token.getAccessToken()
      ? {
          Authorization: 'Bearer ' + token.getAccessToken(),
          'Content-Type': 'application/json'
        }
      : { 'Content-Type': 'application/json' },
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
  const token = useToken()
  const { data, error } = await useFetch(url, {
    headers: token.getAccessToken()
      ? {
          Authorization: 'Bearer ' + token.getAccessToken()
        }
      : undefined,
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
  const token = useToken()
  const { data, error } = await useFetch(url, {
    headers: token.getAccessToken()
      ? {
          Authorization: 'Bearer ' + token.getAccessToken(),
          'Content-Type': 'application/json'
        }
      : { 'Content-Type': 'application/json' },
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
