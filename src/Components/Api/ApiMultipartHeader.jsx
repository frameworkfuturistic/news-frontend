const token = window.localStorage.getItem('token')

export const ApiMultipartHeader = {
    headers: {
        'Content-Type': "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
    }
}