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

  const setCompanyId = (compId) => {
    let comp = {
      companyId: compId
    }
    user.value = { ...user.value, ...comp }
    console.log(user.value)
  }

  const login = (respone) => {
    user.value = {
      userId: respone.userId,
      username: respone.username,
      role: respone.role
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
    getCompanyId,
    setCompanyId
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot))
}
