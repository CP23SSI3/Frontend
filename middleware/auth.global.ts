import { resolveDirective } from 'nuxt/dist/app/compat/capi'
import { UserAuth } from '~/types/User'

export default defineNuxtRouteMiddleware((to, from) => {
  // console.log(to)
  // console.log(from)

  if (to.path.includes('/account')) {
    const auth = useAuth()
    auth.checkStatusAuth()

    const error = storesError()
    if (!auth.statusLogin && auth.user == undefined) {
      return navigateTo('/auth/login')
    } else {
      // let thisUser: UserAuth | null | undefined = null
      let thisUser: UserAuth = auth.user
      if (to.path.includes('/admin')) {
        if (thisUser?.role !== 'ADMIN') {
          return abortNavigation(error.err403)
        }
      } else if (to.path.includes('/company')) {
        if (thisUser?.role !== 'COMPANY') {
          return abortNavigation(error.err403)
        }
      } else if (to.path.includes('/user')) {
        if (thisUser?.role !== 'USER') {
          return abortNavigation(error.err403)
        }
      }
    }
  } else {
    return
  }
})
