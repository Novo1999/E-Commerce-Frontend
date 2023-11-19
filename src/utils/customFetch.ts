import axios from 'axios'

// https://gymba.up.railway.app/api/e-commerce/

const customFetch = axios.create({
  baseURL: 'https://gymba.up.railway.app/api/e-commerce/',
  withCredentials: true,
})

export default customFetch
