import { apiHelper } from './../utils/helper'

export default {
  login ({account, password }) {
    return apiHelper.post('/login', {
      account,
      password
    })
  }
}