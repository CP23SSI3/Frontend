export default defineNuxtRouteMiddleware((to, from) => {
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
