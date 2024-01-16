import { ResponseList, Response } from '~/types/Response'
import { User } from '~/types/User'
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
    throw createError({
      ...error.value,
      statusMessage: `Could not fetch data from ${url}`
    })
  }

  return data
}

// {
//   "status": 200,
//   "message": "The user's data is already sent.",
//   "data": {
//       "address": {
//           "addressId": "fc1e7058-b373-4abd-aad0-8140f9658652",
//           "area": "57 หมู่ 123 ซอย 5 ",
//           "city": "กรุงเทพ",
//           "country": "ประเทศไทย",
//           "district": "ตลิ่งชัน",
//           "latitude": 13.78852300,
//           "longitude": 100.44582200,
//           "postalCode": "10170",
//           "subDistrict": "ตลิ่งชัน"
//       },
//       "company": null,
//       "createdDate": "2023-10-04T13:30:00",
//       "email": "admin@gmail.com",
//       "firstname": "adminfirstname",
//       "lastname": "adminlastname",
//       "lastActive": "2023-10-04T13:30:00",
//       "lastUpdate": "2023-10-04T13:30:00",
//       "password": "adminpassword",
//       "phoneNumber": "0123456789",
//       "role": "ADMIN",
//       "userId": "9c2e4bd8-a897-4bce-9a63-5267283d6e30",
//       "username": "testadmin"
//   }
// }
