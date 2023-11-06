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
  api_getNews           : `${url}/api/crud/story/v1/show`,
  api_addNews           : `${url}/api/crud/story/v1/store`,
  api_updateNews        : `${url}/api/crud/story/v1/edit`,
  api_deleteNews        : `${url}/api/crud/story/v1/delete`,

  // =============Active News Master List===============
    api_getActiveNewsList       : `${url}/api/crud/active-story/v1/news-list`,
    api_getActiveNews           : `${url}/api/crud/active-story/v1/show`,
    api_addActiveNews           : `${url}/api/crud/active-story/v1/store`,
    api_updateActiveNews        : `${url}/api/crud/active-story/v1/edit`,
    api_deleteActiveNews        : `${url}/api/crud/active-story/v1/delete`,

  // =============Category List==============
  api_getCategory        : `${url}/api/crud/category/v1/show`,
  api_addCategory        : `${url}/api/crud/category/v1/store`,
  api_updateCategory     : `${url}/api/crud/category/v1/edit`,
  api_deleteCategory     : `${url}/api/crud/category/v1/delete`,

  // ==========Media Master==============
  api_getMedia      : `${url}/api/crud/media/v1/show`,
  api_updateMedia   : `${url}/api/crud/media/v1/edit`,
  api_addMedia      : `${url}/api/crud/media/v1/store`,
  api_deleteMedia   : `${url}/api/crud/media/v1/delete`,

    // ==========Tag Master==============
    api_getTag     : `${url}/api/crud/tag/v1/show`,
    api_addTag     : `${url}/api/crud/tag/v1/store`,
    api_updateTag  : `${url}/api/crud/tag/v1/edit`,
    api_deleteTag  : `${url}/api/crud/tag/v1/delete`,

}

return api;
}