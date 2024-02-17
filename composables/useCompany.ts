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
// --- getAllUserList ---
export default async (params: any) => {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}companies`
  // const auth = useAuth()
  // const token = auth.$storage.getUniversal('_token.local') as string
  const { data, error } = await useFetch<ResponseCompanyList>(url, {
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
