export default defineNuxtRouteMiddleware((to, from) => {
  // ถ้า login อยู่จะไปหน้า login, auth ไม่ได้
  if (to.path.includes('/auth')) {
    const auth = useAuth()
    auth.checkStatusAuth()

    if (auth.statusLogin || auth.user !== undefined) {
      return navigateTo('/')
    }
  } else {
    return
  }
})
