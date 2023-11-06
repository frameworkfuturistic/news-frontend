import React, { useContext } from 'react'
import SideBar from './SideBar'

const DashboardSidebarIndex = () => {

  let menuList = [
    {name: "Home", path:'/', children:[]},
    {name: "Career Applied List", path:'/career-admin', children:[]},
    {name: "News Master", path:'/news-master', children:[]},
    // {name: "Report News", path:'/report-master', children:[]},
    {name: "Media Master", path:'/media-master', children:[]},
  ]

  return (
    <>
      <SideBar menu={menuList} />
    </>
  )
}

export default DashboardSidebarIndex