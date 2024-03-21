import axios from 'axios'
type TNetworkErrorHandler = () => void

let _onNetworkError: TNetworkErrorHandler
let _onAuthenticatedHandler: TNetworkErrorHandler

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  },
  validateStatus(status) {
    return ![403, 404, 422].includes(status) && status < 500
  },
})

httpClient.interceptors.response.use(undefined, (error) => {
  if ((!error.response || error.code === 'ECONNABORTED') && _onNetworkError) {
    _onNetworkError()
  }

  if (error.response.status === 401 && _onAuthenticatedHandler) {
    _onAuthenticatedHandler()
  }
  return Promise.reject(error)
})

// Добавляем возможность устанавливать обработчики некоторых ошибок API
export const onUnauthenticated = (handler: TNetworkErrorHandler) => {
  _onAuthenticatedHandler = handler
}

export const onNetworkError = (handler: TNetworkErrorHandler) => {
  _onNetworkError = handler
}
