import React, { useContext, useState } from 'react'
import BrandingIndex from '../Branding/BrandingIndex'
import NewsCategoriesIndex from '../NewsCategories/NewsCategoriesIndex'
import BreakingNewsIndex from '../BreakinNews/BreakingNewsIndex'
import HomeLayout from './HomeLayout'
import Footerlayout from '../Footer/Footerlayout'
import footerImage1 from '@/Components/assets/footerimg1.jpg'
import footerimg2 from '@/Components/assets/footerimg2 (1).jpeg'
import footerimg3 from '@/Components/assets/footerimg3(2).jpeg'

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

  const data = {
    bigNews: {
      image: footerImage1,
      heading: "Durga Puja 2023: चक्रव्यूह को पार कर श्रद्धालु मां का कर पाएंगे दर्शन, बकरी बाजार में दिखेगा भव्य पूजा पंडाल",
      content: "रांची : राजधानी रांची में दुर्गा पूजा को लेकर काफी धूम देखा जा रहा है. कई भव्य पंडाल बन रहे हैं जो लोगों को काफी	",
      place: "Kanhaiya Taleja",
      date: "Oct 17, 2023",
    },

    smallNews: [
      {
        image: footerimg2,
        heading: "Durga Puja 2023: चक्रव्यूह को पार कर श्रद्धालु मां का कर",
        date: "Oct., 2023",
      },
      {
        image: footerimg3,
        heading: "रांची के हरमू मैदान में 28 अक्टूबर को बीजेपी की संकल्प ",
        date: "Oct., 2023",
      },
      {
        image: footerimg2,
        heading: "साहेबगंज : खटिया पर ढोकर 12 किमी की दूरी तय कर मरीजों को",
        date: "Oct., 2023",
      },
      {
        image: footerimg3,
        heading: "Jharkhand Breaking News Live: हजारीबाग के लौटवा डैम में ",
        date: "Oct., 2023",
      },
      {
        image: footerimg2,
        heading: "सीएम हेमंत सोरेन ने 827 शिक्षकों को सौंपा नियुक्ति पत्र",
        date: "Oct., 2023",
      },
      {
        image: footerimg3,
        heading: "बाबूलाल मरांडी का हेमंत सोरेन पर निशाना, पूर्व आईएएस विजय",
        date: "Oct., 2023",
      },
      {
        image: footerimg2,
        heading: "Jharkhand Breaking News Live: सीएम हेमंत सोरेन ने 827",
        date: "Oct., 2023",
      },
      {
        image: footerimg3,
        heading: "अमर कुमार बाउरी बने झारखंड बीजेपी विधायक दल के नेता, जेपी",
        date: "Oct., 2023",
      },
      {
        image: footerimg2,
        heading: "बीजेपी की संकल्प यात्रा के समापन पर चर्चा, रांची में",
        date: "Oct., 2023",
      },
      {
        image: footerimg3,
        heading: "विनिता घोष वतन वापस आई, इजरायल में युद्ध के बीच फंसी थी",
        date: "Oct., 2023",
      },
    ]

  }

  let breakingNews = "राज्यसभा में भी महिला आरक्षण विधेयक पारित, महिला सांसदों ने PM मोदी के साथ मनाया जश्न"

  return (
    <div className='relative'>
      <BrandingIndex wpx={wpx} menu={brandingMenu} />
      <div className='h-[1.7rem]'></div>
      <NewsCategoriesIndex wpx={wpx} menu={newsCategoriesMenu} />
      {bClose && <BreakingNewsIndex wpx={wpx} bnews={breakingNews} bClose={(status) => setBClose(status)} />}
      <HomeLayout data={data} wpx={wpx} />
      <HomeLayout data={data} wpx={wpx} header={"मुख्य समाचार"} />

      <Footerlayout />
    </div>
  )
}

export default HomeIndex