import React, { useContext } from 'react'
import SideBar from './SideBar'

const DashboardSidebarIndex = ({ toggleBar, settoggleBar }) => {

  let menuList = [
    {name: "Home", path:'/', children:[]},
    {name: "Career Applied List", path:'/career-admin', children:[]},
    {name: "News Desk", path:'/news-master', children:[]},
    // {name: "Report News", path:'/report-master', children:[]},
    {name: "Media Desk", path:'/media-master', children:[]},
  ]

  return (
    <>
      <SideBar menu={menuList} toggleBar={toggleBar} settoggleBar={settoggleBar} />
    </>
  )
}

export default DashboardSidebarIndex