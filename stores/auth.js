import Swal from 'sweetalert2'

export const useAuth = defineStore('auth', () => {
  const statusLogin = ref(false)
  const user = useCookie('user')
  const router = useRouter()
  const email = ref()

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
    statusLogin.value = true
    location.reload()
    router.push({ path: '/' })
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
        statusLogin.value = false
        location.reload()
        router.push({ path: '/' })
      }
    })
  }

  return {
    statusLogin,
    user,
    router,
    email,

    login,
    logout,
    checkStatusAuth
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot))
}
