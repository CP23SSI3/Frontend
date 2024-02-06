import { ResponseList, Response } from '~/types/Response'
import { User, UserRegister } from '~/types/User'
import { Address, Company } from '~/types/Post'

type UserData = User & {
  address: Address
  company: Company | null
}

type ResponseUserList = ResponseList & {
  data: {
    number: number
    size: number
    totalPages: number
    totalElements: number
    content: UserData[]
  }
}
// --- getAllUserList ---
export default async (params: any) => {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}users`
  // const auth = useAuth()
  // const token = auth.$storage.getUniversal('_token.local') as string
  const { data, error } = await useFetch<ResponseUserList>(url, {
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

type ResponseUser = Response & {
  data: UserData
}
export async function getUserById(id: string) {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}users/${id}`
  // const auth = useAuth()
  // const token = auth.$storage.getUniversal('_token.local') as string
  const { data, error } = await useFetch<ResponseUser>(url, {
    // headers: {
    //   Authorization: token
    // }
  })

  if (error.value) {
    console.log(error.value.statusCode)
    let errorMessage = {
      ...error.value,
      message: `Could not fetch data from ${url}`
    }
    if (error.value.statusCode === 500) {
      errorMessage.message = 'เกิดข้อผิดพลาดเซิร์ฟเวอร์ภายใน'
    } else if (error.value.statusCode === 404) {
      errorMessage.message = `User id ${id} not found`
    }
    throw createError(errorMessage)
  }

  return data
}

type ResponseCreateUser = Response & {
  data: UserRegister
}
export async function register(newUser: ResponseCreateUser) {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}users`
  // const auth = useAuth()
  // const token = auth.$storage.getUniversal('_token.local') as string
  const { data, error } = await useFetch<ResponseUser>(url, {
    headers: {
      // Authorization: token,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(newUser)
  })

  if (error.value) {
    let errorMessage = {
      ...error.value,
      message: `Could not fetch data from ${url}`
    }
    if (error.value.statusCode === 500) {
      errorMessage.message = 'เกิดข้อผิดพลาดเซิร์ฟเวอร์ภายใน'
    } else if (error.value.statusCode === 400) {
      errorMessage.message = `ข้อมูลไม่ถูกต้อง`
    }
    throw createError(errorMessage)
  }

  return data
}
