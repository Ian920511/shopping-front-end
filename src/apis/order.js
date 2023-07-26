import { apiHelper } from "@/utils/helper";

export default {
  postOrders () {
    return apiHelper.post('/orders')
  }
}