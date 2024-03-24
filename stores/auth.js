import Swal from 'sweetalert2'

export const useAuth = defineStore('auth', () => {
  const statusLogin = ref(false)
  const user = useCookie('user')
  const router = useRouter()
  const email = ref()

  const token = useToken()

  const checkStatusAuth = () => {
    if (user.value == undefined) {
      statusLogin.value = false
    } else {
      statusLogin.value = true
    }
    return statusLogin.value
  }

  const getRole = () => (user.value ? user.value.role : null)

  const getCompanyId = () => (user.value ? user.value.companyId : null)

  const login = (respone, compId) => {
    if (respone.role === 'COMPANY') {
      user.value = {
        userId: respone.userId,
        username: respone.username,
        role: respone.role,
        companyId: compId
      }
    } else {
      user.value = {
        userId: respone.userId,
        username: respone.username,
        role: respone.role
      }
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
        token.removeToken()
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
    checkStatusAuth,
    getRole,
    getCompanyId
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot))
}
