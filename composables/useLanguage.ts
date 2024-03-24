import { Response } from '~/types/Response'
import { Language } from '~/types/User'

type ResponseLanguage = Response & {
  data: Language | null
}

export async function useCreateLang(newLang: any) {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}languages`
  const token = useToken()
  const { data, error } = await useFetch<ResponseLanguage>(url, {
    headers: token.getAccessToken()
      ? {
          Authorization: 'Bearer ' + token.getAccessToken(),
          'Content-Type': 'application/json'
        }
      : { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(newLang)
  })

  if (error.value) {
    // console.log(error.value)
    // throw createError({
    //   ...error.value,
    //   statusMessage: `Could not fetch data from ${url}`
    // })
    let errorMessage = {
      ...error.value,
      message: `Could not fetch data from ${url}`
    }
    if (error.value.statusCode === 500) {
      errorMessage.statusMessage = 'Internal server error'
      errorMessage.message =
        'Something has gone wrong on the server hosting a website'
    } else if (error.value.statusCode === 404) {
      errorMessage.message = error.value.data.message
    }
    throw createError(errorMessage)
  }

  return data
}

export async function useDeleteLang(langId: string) {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}languages/${langId}`
  const token = useToken()
  const { data, error } = await useFetch<ResponseLanguage>(url, {
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

export async function useUpdateLang(langId: string, langName: any) {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}languages/${langId}`
  const token = useToken()
  const { data, error } = await useFetch<ResponseLanguage>(url, {
    headers: token.getAccessToken()
      ? {
          Authorization: 'Bearer ' + token.getAccessToken(),
          'Content-Type': 'application/json'
        }
      : { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(langName)
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
