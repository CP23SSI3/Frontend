import { UserAuth } from '~/types/User'

export default async (user: any) => {
  console.log(user)
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}auth/login`

  const { data, error } = await useFetch<UserAuth>(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(user)
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
