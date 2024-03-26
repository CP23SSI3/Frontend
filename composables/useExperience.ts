import { Response } from '~/types/Response'
import { Experience } from '~/types/User'

type ResponseExperience = Response & {
  data: Experience | null
}

export async function useCreateExperience(newExperience: any) {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}experiences`
  const token = useToken()
  const { data, error } = await useFetch<ResponseExperience>(url, {
    headers: token.getAccessToken()
      ? {
          Authorization: 'Bearer ' + token.getAccessToken(),
          'Content-Type': 'application/json'
        }
      : { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(newExperience)
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

export async function useUpdateExperience(experId: string, editExper: any) {
  console.log(experId)
  console.log(editExper)
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}experiences/${experId}`
  const token = useToken()
  const { data, error } = await useFetch<ResponseExperience>(url, {
    headers: token.getAccessToken()
      ? {
          Authorization: 'Bearer ' + token.getAccessToken(),
          'Content-Type': 'application/json'
        }
      : { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(editExper)
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

export async function useDeleteExperience(experienceId: string) {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}experiences/${experienceId}`
  const token = useToken()
  const { data, error } = await useFetch<ResponseExperience>(url, {
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
