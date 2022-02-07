import axios from 'axios';

const api = axios.create({
    baseURL: 'http://summerweek-env.eba-ymmyqipk.us-east-1.elasticbeanstalk.com'
})

export default api;