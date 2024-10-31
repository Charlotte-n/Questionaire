import { BASE_URL } from './config'
import HYRequest from './request'

const hyRequest = new HYRequest({
    baseURL: BASE_URL,
})

export default hyRequest
