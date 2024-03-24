import { Response } from '~/types/Response'
import { Company } from '~/types/Post'

type ResponseCompanyList = Response & {
  data: {
    number: number
    size: number
    totalPages: number
    totalElements: number
    content: Company[]
  }
}
// --- getAllCompanyList for ADMIN only ---
export default async (params: any) => {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}companies`
  const token = useToken()
  const { data, error } = await useFetch<ResponseCompanyList>(url, {
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

type ResponseCompany = Response & {
  data: Company
}

export async function getCompanyById(id: string) {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}companies/${id}`
  const token = useToken()
  const { data, error } = await useFetch<ResponseCompany>(url, {
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
      errorMessage.message = `Company id ${id} not found`
    }
    throw createError(errorMessage)
  }

  return data
}
