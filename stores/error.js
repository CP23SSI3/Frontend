import Swal from 'sweetalert2'

export const storesError = defineStore('error', () => {
  const err403 = {
    statusCode: 403,
    statusMessage: 'Access deined',
    message: "We're sorry, but you don't have permission to access this page."
  }

  const err500 = {
    statusCode: 500,
    statusMessage: 'Internal server error',
    message: 'Something has gone wrong on the server hosting a website'
  }

  return {
    err403,
    err500
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot))
}
