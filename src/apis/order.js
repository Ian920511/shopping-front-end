import { apiHelper } from "@/utils/helper";

export default {
  getOrders ({ userId }) {
    return apiHelper.get(`/users/${userId}/orders`)
  }
}