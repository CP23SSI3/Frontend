export default defineNuxtRouteMiddleware((to, from) => {
  // console.log(to)
  // console.log(from)

  if (to.path.includes('/account')) {
    const auth = useAuth()
    const error = storesError()

    auth.checkStatusAuth()
    if (
      !auth.statusLogin &&
      auth.user == undefined &&
      to.path.includes('/account')
    ) {
      return navigateTo('/auth/login')
    } else {
      let thisRole = auth.getRole()
      if (to.path.includes('/admin')) {
        if (thisRole !== 'ADMIN') {
          return abortNavigation(error.err403)
        }
      } else if (to.path.includes('/company')) {
        if (thisRole !== 'COMPANY') {
          return abortNavigation(error.err403)
        }
      } else if (to.path.includes('/user')) {
        if (thisRole !== 'USER') {
          return abortNavigation(error.err403)
        }
      }
    }
  } else {
    return
  }
})
