import Swal from 'sweetalert2'
import { reloadNuxtApp } from 'nuxt/app'

export const useAuth = defineStore('auth', () => {
  const statusLogin = ref(false)
  const user = useCookie('user')
  // const accessToken = useCookie('accessToken')
  // const refreshToken = useCookie('refreshToken')

  const router = useRouter()

  const checkStatusAuth = () => {
    if (user.value == undefined) {
      statusLogin.value = false
    } else {
      statusLogin.value = true
    }
    return statusLogin.value
  }

  const login = (respone) => {
    user.value = {
      userId: respone.userId,
      username: respone.username,
      role: respone.role,
      accessToken: respone.accessToken,
      refreshToken: respone.refreshToken
    }
    // accessToken.value = respone.accessToken
    // refreshToken.value = respone.refreshToken
    statusLogin.value = true
    router.go(-1)
  }

  const logout = function () {
    Swal.fire({
      title: 'ออกจากระบบ',
      text: 'คุณแน่ใจหรือว่าจะออกจากระบบ',
      icon: 'warning',
      confirmButtonText: 'ออกจากระบบ',
      confirmButtonColor: 'red',
      showCancelButton: true,
      cancelButtonText: 'ยกเลิก',
      cancelButtonColor: 'gray',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        user.value = null
        // accessToken.value = null
        // refreshToken.value = null
        statusLogin.value = false
        reloadNuxtApp({
          path: '/',
          ttl: 1000
        })
      }
    })
  }

  return {
    statusLogin,
    user,
    // accessToken,
    // refreshToken,

    login,
    logout,
    checkStatusAuth
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot))
}
