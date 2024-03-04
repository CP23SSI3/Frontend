import { UserAuth } from '~/types/User'
import { Response } from '~/types/Response'

type ResponseAuth = Response & {
  data: UserAuth
}

export default async (user: any) => {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}auth/login`
  const token = useToken()
  const { data, error } = await useFetch<ResponseAuth>(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(user),
    onResponse({ response }) {
      token.setToken(
        response.headers.get('access-token'),
        response.headers.get('refresh-token')
      )
    }
  })

  if (error.value) {
    console.log(error.value.statusCode)
    let errorMessage = {
      ...error.value,
      message: `Could not fetch data from ${url}`
    }
    if (error.value.statusCode === 500) {
      errorMessage.statusMessage = 'Internal server error'
      errorMessage.message =
        'Something has gone wrong on the server hosting a website'
    } else if (error.value.statusCode === 400) {
      errorMessage.message = 'Password ไม่ถูกต้อง'
    } else if (error.value.statusCode === 404) {
      errorMessage.message = 'ไม่พบ Username นี้'
    }
    // มี email , username ผิด
    throw createError(errorMessage)
  }
  return data
}

export async function getRefreshToken() {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}auth/refresh-token`
  const token = useToken()
  const { data, error } = await useFetch<ResponseAuth>(url, {
    headers: {
      Authorization: 'Bearer ' + token.getRefreshToken()
    },
    method: 'POST',
    onResponse({ response }) {
      token.setToken(
        response.headers.get('access-token'),
        response.headers.get('refresh-token')
      )
    }
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
