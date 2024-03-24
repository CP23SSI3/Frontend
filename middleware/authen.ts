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
    // } else if (to.path.includes('/internship/company')) {
    //   const auth = useAuth()
    //   auth.checkStatusAuth()
    //   if (auth.user == undefined) {
    //     return navigateTo('/internship')
    //   } else if (auth.user) {
    //     let thisRole = auth.getRole()

    //     if (thisRole == 'ADMIN') {
    //       return
    //     }
    //     if (thisRole == 'COMPANY') {
    //       let companyId = auth.getCompanyId()
    //       if (companyId == to.params.compId) {
    //         return
    //       } else {
    //         return navigateTo('/internship')
    //       }
    //     }
    //     if (thisRole == 'USER') {
    //       return navigateTo('/internship')
    //     }
    //   }
  } else {
    return
  }
})
