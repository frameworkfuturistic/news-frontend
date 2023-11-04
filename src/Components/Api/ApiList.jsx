export const ApiList = () => {

  const url = import.meta.env.VITE_REACT_APP_URL

  const api = {

  // Authorization APIs
  apiRegister     : url + "/api/auth/register",
  apiLogin        : url + "/api/auth/login",
  apiLogout       : url + "/api/auth/logout",
  
  // =========Career Form============
  apiCareerForm       : url + "/api/v1/job/apply",

  // ============Career Applied List==============
  api_getCareerList       : url + "/api/v1/job/list",

  // =============News Master List===============
  api_getNewsList       : url + "/api/v1/job/list",

  // ==========Media Master==============
  api_getMedia: `${url}/api/crud/media/v1/show`,
  api_updateMedia: `${url}/api/crud/media/v1/edit`,
  api_addMedia: `${url}/api/crud/media/v1/store`,
  api_deleteMedia: `${url}/api/crud/media/v1/delete`,

    // ==========Media Master==============
    api_getTag: `${url}/`,
    api_addTag: `${url}/`,
    api_updateTag: `${url}/`,
    api_deleteTag: `${url}/`,
  
  apiGetNews           : url + "/api/crud/content/v1/show",
  apiGetNewsById       : url + "/api/",
}

return api;
}