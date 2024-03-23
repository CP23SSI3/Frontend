export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path.includes('/internship/form') || to.path.includes('/edit')) {
    const auth = useAuth()

    const error = storesError()
    auth.checkStatusAuth()
    let thisRole = auth.getRole()
    if (thisRole == 'COMPANY' || thisRole == 'ADMIN') {
      return
    } else {
      return navigateTo('/internship')
    }
  } else {
    return
  }
})
