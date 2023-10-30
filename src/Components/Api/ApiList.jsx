export const ApiList = () => {

  const url = import.meta.env.VITE_REACT_APP_URL

  const api = {

  // Authorization APIs
  apiRegister     : url + "/api/auth/register",
  apiLogin        : url + "/api/auth/login",
  apiLogout       : url + "/api/auth/logout",
  
  apiCareerForm       : url + "/api/v1/job/apply",

  apiGetNews           : url + "/api/crud/content/v1/show",
  apiGetNewsById       : url + "/api/",
  
  api_getCareerList       : url + "/api/v1/job/list",

  api_getNewsList       : url + "/api/v1/job/list",

}

return api;
}