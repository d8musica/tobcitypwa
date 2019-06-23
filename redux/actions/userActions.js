import axios from "axios"
const server = process.env.SERVER

export function updateUser(user) {
  return () => {
    return axios.post(server + "/api/update_user", {user})
  }
}