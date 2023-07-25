import { apiHelper } from "./../utils/helper";

export default {
  getCategories () {
    return apiHelper.get('/categories')
  }
}