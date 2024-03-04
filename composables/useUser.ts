import { Response } from '~/types/Response'
import { User, UserRegister } from '~/types/User'
import { Address, Company } from '~/types/Post'

type UserData = User & {
  address: Address
  company: Company | null
}

type ResponseUserList = Response & {
  data: {
    number: number
    size: number
    totalPages: number
    totalElements: number
    content: UserData[]
  }
}
// --- getAllUserList for ADMIN only ---
export default async (params: any) => {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}users`
  const token = useToken()
  const { data, error } = await useFetch<ResponseUserList>(url, {
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

type ResponseUser = Response & {
  data: UserData
}

export async function getUserById(id: string) {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}users/${id}`
  const token = useToken()
  const { data, error } = await useFetch<ResponseUser>(url, {
    headers: token.getAccessToken()
      ? {
          Authorization: 'Bearer ' + token.getAccessToken()
        }
      : undefined
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
    } else if (error.value.statusCode === 404) {
      errorMessage.message = `User id ${id} not found`
    }
    throw createError(errorMessage)
  }

  return data
}

type checkingUsernameEmail = {
  username: string
  email: string
}
type ResponseCheckUser = Response & {
  data: null
}

// --- check username, email when login ---
export async function useCheckUsernameEmail(params: checkingUsernameEmail) {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}users/username-email-checking`
  const { data, error } = await useFetch<checkingUsernameEmail>(url, {
    params
  })

  if (error.value) {
    console.log(error.value)
    let errorMessage = {
      ...error.value,
      message: `Could not fetch data from ${url}`
    }
    if (error.value.statusCode === 500) {
      errorMessage.statusMessage = 'Internal server error'
      errorMessage.message =
        'Something has gone wrong on the server hosting a website'
    } else if (error.value.statusCode === 400) {
      errorMessage.message = error.value.data.message
    }
    throw createError(errorMessage)
  }

  return data
}

type checkingUsername = {
  username: string
}

// --- check username when edit user ---
export async function useCheckUsername(params: checkingUsername) {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}users/username-checking`
  const token = useToken()
  const { data, error } = await useFetch<ResponseCheckUser>(url, {
    params,
    headers: token.getAccessToken()
      ? {
          Authorization: 'Bearer ' + token.getAccessToken()
        }
      : undefined
  })

  if (error.value) {
    console.log(error.value)
    let errorMessage = {
      ...error.value,
      message: `Could not fetch data from ${url}`
    }
    if (error.value.statusCode === 500) {
      errorMessage.statusMessage = 'Internal server error'
      errorMessage.message =
        'Something has gone wrong on the server hosting a website'
    } else if (error.value.statusCode === 400) {
      errorMessage.message = error.value.data.message
    }
    throw createError(errorMessage)
  }

  return data
}

type ResponseCreateUser = Response & {
  data: UserRegister
}
export async function useRegister(newUser: UserRegister) {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}users`
  const { data, error } = await useFetch<ResponseCreateUser>(url, {
    headers: {
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
      errorMessage.statusMessage = 'Internal server error'
      errorMessage.message =
        'Something has gone wrong on the server hosting a website'
    } else if (error.value.statusCode === 400) {
      errorMessage.message = error.value.data.message
    }
    throw createError(errorMessage)
  }

  return data
}

export async function useDeleteUser(id: string) {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}users/${id}`
  const token = useToken()
  const { data, error } = await useFetch<ResponseCheckUser>(url, {
    headers: token.getAccessToken()
      ? {
          Authorization: 'Bearer ' + token.getAccessToken()
        }
      : undefined,
    method: 'DELETE'
  })

  if (error.value) {
    let errorMessage = {
      ...error.value,
      message: `Could not fetch data from ${url}`
    }
    if (error.value.statusCode === 500) {
      errorMessage.message = 'เกิดข้อผิดพลาดเซิร์ฟเวอร์ภายใน'
    } else if (error.value.statusCode === 400) {
      errorMessage.message = error.value.data.message
    }
    throw createError(errorMessage)
  }

  return data
}

export async function useUpdateUser(userId: string, editUser: any) {
  const runtimeConfig = useRuntimeConfig()
  const API_URL = runtimeConfig.public.API_URL
  const url = `${API_URL}users/${userId}`
  const token = useToken()
  const { data, error } = await useFetch(url, {
    headers: token.getAccessToken()
      ? {
          Authorization: 'Bearer ' + token.getAccessToken(),
          'Content-Type': 'application/json'
        }
      : undefined,
    method: 'PUT',
    body: JSON.stringify(editUser)
  })

  if (error.value) {
    console.log(error.value)
    let errorMessage = {
      ...error.value,
      message: `Could not fetch data from ${url}`
    }
    if (error.value.statusCode === 500) {
      errorMessage.statusMessage = 'Internal server error'
      errorMessage.message =
        'Something has gone wrong on the server hosting a website'
    } else if (error.value.statusCode === 400) {
      errorMessage.message = error.value.data.message
    }
    throw createError(errorMessage)
  }

  return data
}
