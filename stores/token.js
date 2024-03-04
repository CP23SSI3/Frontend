export const useToken = defineStore('token', () => {
  const token = useCookie('token')

  const getAccessToken = () => (token.value ? token.value.accessToken : null)

  const getRefreshToken = () => (token.value ? token.value.refreshToken : null)

  const setToken = (accessToken, refreshToken) => {
    token.value = {
      accessToken: accessToken,
      refreshToken: refreshToken
    }
  }

  const removeToken = () => {
    token.value = null
  }

  // const refreshPage = () => {
  //   location.reload()
  // }

  // function ที่ access token หมดอายุแล้ว จะส่งไปขอ access token ใหม่ โดยใช้ refresh-token

  return {
    token,
    setToken,
    removeToken,

    getAccessToken,
    getRefreshToken

    // refreshPage
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useToken, import.meta.hot))
}
