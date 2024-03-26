import { Response } from '~/types/Response'
import { Skill } from '~/types/User'

type ResponseSkill = Response & {
  data: Skill | null
}

export async function useCreateSkill(newSkill: any) {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}skills`
  const token = useToken()
  const { data, error } = await useFetch<ResponseSkill>(url, {
    headers: token.getAccessToken()
      ? {
          Authorization: 'Bearer ' + token.getAccessToken(),
          'Content-Type': 'application/json'
        }
      : { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(newSkill)
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
      errorMessage.message = error.value.data.message
    }
    throw createError(errorMessage)
  }

  return data
}

export async function useUpdateSkill(skillId: string, editSkill: any) {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}skills/${skillId}`
  const token = useToken()
  const { data, error } = await useFetch<ResponseSkill>(url, {
    headers: token.getAccessToken()
      ? {
          Authorization: 'Bearer ' + token.getAccessToken(),
          'Content-Type': 'application/json'
        }
      : { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(editSkill)
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

export async function useDeleteSkill(skillId: string) {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}skills/${skillId}`
  const token = useToken()
  const { data, error } = await useFetch<ResponseSkill>(url, {
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
