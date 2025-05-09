import axios from 'axios'

export const linkedinSchedulePost = async () =>{
    const response = axios.get('http://localhost:5000/post/linkedin/Posts',{
        withCredentials: true
      })

      return (await response).data.data
}