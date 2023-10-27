import React, { useContext } from 'react'
import SideBar from './SideBar'
import { contextVar } from '@/Components/context/contextVar'

const DashboardSidebarIndex = () => {

  let menuList = [
    {name: "Career Applied List", path:'/career-admin', children:[]},
  ]

  return (
    <>
      <SideBar menu={menuList} />
    </>
  )
}

export default DashboardSidebarIndex