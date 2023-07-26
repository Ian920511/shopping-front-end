import axios  from 'axios'
import Swal from 'sweetalert2'

const baseURL = "https://shopping-2023-bb99fdfd4043.herokuapp.com/api"

const axiosInstance = axios.create({
  baseURL
})

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})

export const apiHelper = axiosInstance

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: 'false',
  timer: 3000
})