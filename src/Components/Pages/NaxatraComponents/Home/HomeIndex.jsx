import React, { useContext, useState } from 'react'
import BrandingIndex from '../Branding/BrandingIndex'
import NewsCategoriesIndex from '../NewsCategories/NewsCategoriesIndex'
import BreakingNewsIndex from '../BreakinNews/BreakingNewsIndex'

const HomeIndex = () => {

  const [bClose, setBClose] = useState(true)

  let wpx = JSON.parse(localStorage.getItem('layout'))?.Layout_width || '1366px'

  const brandingMenu = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/" },
    { title: "Contact Us", path: "/" },
    { title: "Career", path: "/career" },
  ]

  const newsCategoriesMenu = [
    { title: "Home", path: "/", subMenu: [] },
    { title: "मुख्य समाचार", path: "/", subMenu: [] },
    { title: "झारखंड", path: "/", subMenu: [] },
    { title: "बिहार", path: "/", subMenu: [] },
    { title: "राज्य", path: "/", subMenu: [] },
    { title: "देश", path: "/", subMenu: [] },
    { title: "मनोरंजन", path: "/", subMenu: [] },
    { title: "व्यापार", path: "/", subMenu: [] },
    { title: "टैकनोलजी", path: "/", subMenu: [] },
    { title: "राशिफल", path: "/", subMenu: [] },
    {
      title: "धार्मिक", path: "", subMenu: []
    },
  ]

  let breakingNews = "राज्यसभा में भी महिला आरक्षण विधेयक पारित, महिला सांसदों ने PM मोदी के साथ मनाया जश्न"

  return (
    <>
      <BrandingIndex wpx={wpx} menu={brandingMenu} />
      <div className='h-[1.7rem]'></div>
      <NewsCategoriesIndex wpx={wpx} menu={newsCategoriesMenu} />
      {bClose && <BreakingNewsIndex wpx={wpx} bnews={breakingNews} bClose={(status) => setBClose(status)} />}
    </>
  )
}

export default HomeIndex