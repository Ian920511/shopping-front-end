import axios  from 'axios'
import Swal from 'sweetalert2'

const BASE_URL = 'http://localhost:3000/api'

const axiosInstance = axios.create({
  BASE_URL
})

export const apiHelper = axiosInstance

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: 'false',
  timer: 3000
})