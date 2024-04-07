import axios from 'axios'

const fetcherGet = (url: string) => axios.get(url).then((res) => res.data)
const fetcherPost = params => (url: string) => axios.post(url,params).then((res) => res.data)

export { fetcherGet, fetcherPost }