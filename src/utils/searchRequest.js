import axios from 'axios';

const request = axios.create({
  baseURL:"http://api.tianditu.gov.cn/search"
})

export default request