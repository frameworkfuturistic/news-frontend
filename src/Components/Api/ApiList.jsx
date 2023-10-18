export const ApiList = () => {

  const url = import.meta.env.VITE_REACT_APP_URL

  const api = {

  // Authorization APIs
  apiRegister     : url + "/api/auth/register",
  apiLogin        : url + "/api/auth/login",
  apiLogout       : url + "/api/auth/logout",
  
  apiCareerForm       : url + "/api/v1/job/apply",

  apiGetNewsById       : url + "/api/",

  api         :   url + "/api/categories", // 'User asks category list
  api         :   url + "/api/categories", // 'User creates/ updates categor
  api         :   url + "/api/categories/{id}", // 'User wants to see a perticular category
  api         :   url + "/api/stories", // 'User wants to see stories based on criteria [query parameters] category,tag
  api         :   url + "/api/stories", // 'User adds or updates a story
  api         :   url + "/api/stories/{id}", // 'User wants to see a perticular story
  api         :   url + "/api/users", // 'User wants to see user list
  api         :   url + "/api/users", // 'User wants to add/update a user
  api         :   url + "/api/users/{id}", // 'User wants to see a perticular user
  api         :   url + "/api/sections", // 'User wants to see all the sections
  api         :   url + "/api/sections", // 'User wants to add section
  api         :   url + "/api/sections/{id}", // 'User wants to see a perticular section
  api         :   url + "/api/tags", // 'User wants to see all the tags
  api         :   url + "/api/tags", // 'User wants to add/update tags
  api         :   url + "/api/media", // 'User wants to see all the media 'by media category/tag
  api         :   url + "/api/media", // 'User wants to add/update media
  api         :   url + "/api/archiveSectionStory", // 'User wants to add/update media
  api         :   url + "/api/addSectionStory", // 'User wants to add/update media
  api         :   url + "/api/layout", // 'User asks layout list to render page
  api         :   url + "/api/reporterStory", // 'User wants to see all the media 'by media category/tag
  api         :   url + "/api/addReporterStory", // 'User wants to add/update media

}

return api;
}