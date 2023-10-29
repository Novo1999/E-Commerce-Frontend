import axios from 'axios'

const customFetch = axios.create({
  baseURL: 'https://gymba.up.railway.app/api/e-commerce/',
})

export default customFetch
