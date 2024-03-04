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
    // console.log(error.value)
    throw createError({
      ...error.value,
      statusMessage: `Could not fetch data from ${url}`
    })
  }
  return data
}
