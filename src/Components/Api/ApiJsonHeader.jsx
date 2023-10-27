const token = window.localStorage.getItem('token')

export const ApiJsonHeader = {
   headers: {
     'Content-Type': 'application/json',
    Accept: "application/json",
    Authorization: `Bearer ${token}`
   }
}