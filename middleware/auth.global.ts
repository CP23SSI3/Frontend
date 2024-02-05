export default defineNuxtRouteMiddleware((to, from) => {
  // console.log(to)
  // console.log(from)
  // const auth = useAuth()
  // auth.checkStatusAuth()
  // if (to.path.includes('/account') && auth.statusLogin) {
  //   console.log('Page login')
  // } else {
  //   console.log('Page not login')
  // }
  if (to.path.includes('/account')) {
    const auth = useAuth()
    auth.checkStatusAuth()
    if (!auth.statusLogin && auth.user == undefined) {
      return navigateTo('/')
    } else if (to.path.includes('/admin')) {
      if (auth.user?.role !== 'ADMIN') {
        return navigateTo('/error/403')
      }
    } else if (to.path.includes('/company')) {
      if (auth.user?.role !== 'COMPANY') {
        return navigateTo('/error/403')
      }
    } else if (to.path.includes('/user')) {
      if (auth.user?.role !== 'USER') {
        return navigateTo('/error/403')
      }
    }
  } else {
    return
  }
})
