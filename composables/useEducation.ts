import { Response } from '~/types/Response'
import { Education } from '~/types/User'

type ResponseEducation = Response & {
  data: Education | null
}

export async function useCreateEducation(newEducation: any) {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}educations`
  const token = useToken()
  const { data, error } = await useFetch<ResponseEducation>(url, {
    headers: token.getAccessToken()
      ? {
          Authorization: 'Bearer ' + token.getAccessToken(),
          'Content-Type': 'application/json'
        }
      : { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(newEducation)
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

export async function useUpdateEducation(
  educationId: string,
  editEducation: any
) {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}educations/${educationId}`
  const token = useToken()
  const { data, error } = await useFetch<ResponseEducation>(url, {
    headers: token.getAccessToken()
      ? {
          Authorization: 'Bearer ' + token.getAccessToken(),
          'Content-Type': 'application/json'
        }
      : { 'Content-Type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(editEducation)
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

export async function useDeleteEducation(educationId: string) {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}educations/${educationId}`
  const token = useToken()
  const { data, error } = await useFetch<ResponseEducation>(url, {
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
