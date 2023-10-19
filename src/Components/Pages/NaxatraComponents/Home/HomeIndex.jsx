import React, { useContext, useState } from 'react'
import BrandingIndex from '../Branding/BrandingIndex'
import NewsCategoriesIndex from '../NewsCategories/NewsCategoriesIndex'
import BreakingNewsIndex from '../BreakinNews/BreakingNewsIndex'
import HomeLayout from './HomeLayout'
import Footerlayout from '../Footer/Footerlayout'
import footerImage1 from '@/Components/assets/footerimg1.jpg'
import footerimg2 from '@/Components/assets/footerimg2 (1).jpeg'
import footerimg3 from '@/Components/assets/footerimg3(2).jpeg'
import axios from 'axios'
import { ApiList } from '@/Components/Api/ApiList'
import { ApiJsonHeader } from '@/Components/Api/ApiJsonHeader'
import ContentIndex from '../Content/ContentIndex'

const HomeIndex = () => {

  const {apiGetNewsById} = ApiList()
  
  const [bClose, setBClose] = useState(true)
  const [pageToggle, setPageToggle] = useState(false)
  const [pageData, setPageData] = useState(
    { bigNews: {
    image: footerImage1,
    heading: "Durga Puja 2023: चक्रव्यूह को पार कर श्रद्धालु मां का कर पाएंगे दर्शन, बकरी बाजार में दिखेगा भव्य पूजा पंडाल",
    content: "रांची : राजधानी रांची में दुर्गा पूजा को लेकर काफी धूम देखा जा रहा है. कई भव्य पंडाल बन रहे हैं जो लोगों को काफी	",
    author: "Kanhaiya Taleja",
    id: 56,
    date: "Oct 17, 2023",
    sections: [
      {
        title: "Demo",
        content: "राजधानी रांची में दुर्गा पूजा को लेकर काफी धूम देखा जा रहा है. कई भव्य पंडाल बन रहे हैं जो लोगों को काफीराजधानी रांची में दुर्गा पूजा को लेकर काफी धूम देखा जा रहा है. कई भव्य पंडाल बन रहे हैं जो लोगों को काफीराजधानी रांची में दुर्गा पूजा को लेकर काफी धूम देखा जा रहा है. कई भव्य पंडाल बन रहे हैं जो लोगों को काफीराजधानी रांची में दुर्गा पूजा को लेकर काफी धूम देखा जा रहा है. कई भव्य पंडाल बन रहे हैं जो लोगों को काफीराजधानी रांची में दुर्गा पूजा को लेकर काफी धूम देखा जा रहा है. कई भव्य पंडाल बन रहे हैं जो लोगों को काफीराजधानी रांची में दुर्गा पूजा को लेकर काफी धूम देखा जा रहा है. कई भव्य पंडाल बन रहे हैं जो लोगों को काफी"
      }
    ]
  },

  smallNews: [
    {
      image: footerimg2,
      heading: "Durga Puja 2023: चक्रव्यूह को पार कर श्रद्धालु मां का कर",
      id: 56,
      date: "Oct., 2023",
    },
    {
      image: footerimg3,
      heading: "रांची के हरमू मैदान में 28 अक्टूबर को बीजेपी की संकल्प ",
      id: 56,
      date: "Oct., 2023",
    },
    {
      image: footerimg2,
      heading: "साहेबगंज : खटिया पर ढोकर 12 किमी की दूरी तय कर मरीजों को",
      id: 56,
      date: "Oct., 2023",
    },
    {
      image: footerimg3,
      heading: "Jharkhand Breaking News Live: हजारीबाग के लौटवा डैम में ",
      id: 56,
      date: "Oct., 2023",
    },
    {
      image: footerimg2,
      heading: "सीएम हेमंत सोरेन ने 827 शिक्षकों को सौंपा नियुक्ति पत्र",
      id: 56,
      date: "Oct., 2023",
    },
    {
      image: footerimg3,
      heading: "बाबूलाल मरांडी का हेमंत सोरेन पर निशाना, पूर्व आईएएस विजय",
      id: 56,
      date: "Oct., 2023",
    },
    {
      image: footerimg2,
      heading: "Jharkhand Breaking News Live: सीएम हेमंत सोरेन ने 827",
      id: 56,
      date: "Oct., 2023",
    },
    {
      image: footerimg3,
      heading: "अमर कुमार बाउरी बने झारखंड बीजेपी विधायक दल के नेता, जेपी",
      id: 56,
      date: "Oct., 2023",
    },
    {
      image: footerimg2,
      heading: "बीजेपी की संकल्प यात्रा के समापन पर चर्चा, रांची में",
      id: 56,
      date: "Oct., 2023",
    },
    {
      image: footerimg3,
      heading: "विनिता घोष वतन वापस आई, इजरायल में युद्ध के बीच फंसी थी",
      id: 56,
      date: "Oct., 2023",
    },
  ],

  rightMenu: 
    {
      header: "",
      source: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      heading: "Durga Puja 2023: चक्रव्यूह को पार कर श्रद्धालु मां का कर पाएंगे दर्शन, बकरी बाजार में दिखेगा भव्य पूजा पंडाल",
      content: "रांची : राजधानी रांची में दुर्गा पूजा को लेकर काफी धूम देखा जा रहा है. कई भव्य पंडाल बन रहे हैं जो लोगों को काफी	",
      author: "Kanhaiya Taleja",
      id: 56,
      date: "Oct 17, 2023",
    }
  })

  let wpx = JSON.parse(localStorage.getItem('layout'))?.Layout_width || '1366px'

  const brandingMenu = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/" },
    { title: "Contact Us", path: "/" },
    { title: "Apply For Job", path: "/career" },
  ]

  const newsCategoriesMenu = [
    { title: "होम", path: "/", subMenu: [] },
    { title: "मुख्य समाचार", path: "/", subMenu: [] },
    { title: "झारखंड", path: "/", subMenu: [] },
    { title: "बिहार", path: "/", subMenu: [] },
    { title: "राज्य", path: "/", subMenu: [] },
    { title: "देश", path: "/", subMenu: [] },
    { title: "मनोरंजन", path: "/", subMenu: [] },
    { title: "व्यापार", path: "/", subMenu: [] },
    { title: "टैकनोलजी", path: "/", subMenu: [] },
    { title: "राशिफल", path: "/", subMenu: [] },
    {title: "धार्मिक", path: "", subMenu: []},
    {title: "खेल", path: "", subMenu: [
      {title: "क्रिकेट", path: "#"},
      {title: "हॉकी", path: "#"},
    ]},
  ]
  // <iframe width="560" height="315" src="https://www.youtube.com/embed/cWTTDvKUFdY?si=OEP67HkZ-RcgDafN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  const data = [
   { bigNews: {
      image: footerImage1,
      heading: "Durga Puja 2023: चक्रव्यूह को पार कर श्रद्धालु मां का कर पाएंगे दर्शन, बकरी बाजार में दिखेगा भव्य पूजा पंडाल",
      content: "रांची : राजधानी रांची में दुर्गा पूजा को लेकर काफी धूम देखा जा रहा है. कई भव्य पंडाल बन रहे हैं जो लोगों को काफी	",
      author: "Kanhaiya Taleja",
      id: 56,
      date: "Oct 17, 2023",
    },

    smallNews: [
      {
        image: footerimg2,
        heading: "Durga Puja 2023: चक्रव्यूह को पार कर श्रद्धालु मां का कर",
        id: 56,
        date: "Oct., 2023",
      },
      {
        image: footerimg3,
        heading: "रांची के हरमू मैदान में 28 अक्टूबर को बीजेपी की संकल्प ",
        id: 56,
        date: "Oct., 2023",
      },
      {
        image: footerimg2,
        heading: "साहेबगंज : खटिया पर ढोकर 12 किमी की दूरी तय कर मरीजों को",
        id: 56,
        date: "Oct., 2023",
      },
      {
        image: footerimg3,
        heading: "Jharkhand Breaking News Live: हजारीबाग के लौटवा डैम में ",
        id: 56,
        date: "Oct., 2023",
      },
      {
        image: footerimg2,
        heading: "सीएम हेमंत सोरेन ने 827 शिक्षकों को सौंपा नियुक्ति पत्र",
        id: 56,
        date: "Oct., 2023",
      },
      {
        image: footerimg3,
        heading: "बाबूलाल मरांडी का हेमंत सोरेन पर निशाना, पूर्व आईएएस विजय",
        id: 56,
        date: "Oct., 2023",
      },
      {
        image: footerimg2,
        heading: "Jharkhand Breaking News Live: सीएम हेमंत सोरेन ने 827",
        id: 56,
        date: "Oct., 2023",
      },
      {
        image: footerimg3,
        heading: "अमर कुमार बाउरी बने झारखंड बीजेपी विधायक दल के नेता, जेपी",
        id: 56,
        date: "Oct., 2023",
      },
      {
        image: footerimg2,
        heading: "बीजेपी की संकल्प यात्रा के समापन पर चर्चा, रांची में",
        id: 56,
        date: "Oct., 2023",
      },
      {
        image: footerimg3,
        heading: "विनिता घोष वतन वापस आई, इजरायल में युद्ध के बीच फंसी थी",
        id: 56,
        date: "Oct., 2023",
      },
    ],

    rightMenu: 
      {
        header: "",
       
        heading: "Durga Puja  : चक्रव्यूह को पार कर श्रद्धालु मां का कर पाएंगे दर्शन, बकरी बाजार में दिखेगा भव्य पूजा पंडाल",
        content: "रांची : राजधानी रांची में दुर्गा पूजा को लेकर काफी धूम देखा जा रहा है. कई भव्य पंडाल बन रहे हैं जो लोगों को काफी	",
        place: "Kanhaiya Taleja",
        id: 56,
        date: "Oct 17, 2023",
      }
    },

    { bigNews: {
      image: footerImage1,
      heading: "Durga Puja 2023: चक्रव्यूह को पार कर श्रद्धालु मां का कर पाएंगे दर्शन, बकरी बाजार में दिखेगा भव्य पूजा पंडाल",
      content: "रांची : राजधानी रांची में दुर्गा पूजा को लेकर काफी धूम देखा जा रहा है. कई भव्य पंडाल बन रहे हैं जो लोगों को काफी	",
      author: "Kanhaiya Taleja",
      id: 56,
      date: "Oct 17, 2023",
    },

    smallNews: [
      {
        image: footerimg2,
        heading: "Durga Puja 2023: चक्रव्यूह को पार कर श्रद्धालु मां का कर",
        id: 56,
        date: "Oct., 2023",
      },
      {
        image: footerimg3,
        heading: "रांची के हरमू मैदान में 28 अक्टूबर को बीजेपी की संकल्प ",
        id: 56,
        date: "Oct., 2023",
      },
      {
        image: footerimg2,
        heading: "साहेबगंज : खटिया पर ढोकर 12 किमी की दूरी तय कर मरीजों को",
        id: 56,
        date: "Oct., 2023",
      },
      {
        image: footerimg3,
        heading: "Jharkhand Breaking News Live: हजारीबाग के लौटवा डैम में ",
        id: 56,
        date: "Oct., 2023",
      },
      {
        image: footerimg2,
        heading: "सीएम हेमंत सोरेन ने 827 शिक्षकों को सौंपा नियुक्ति पत्र",
        id: 56,
        date: "Oct., 2023",
      },
      {
        image: footerimg3,
        heading: "बाबूलाल मरांडी का हेमंत सोरेन पर निशाना, पूर्व आईएएस विजय",
        id: 56,
        date: "Oct., 2023",
      },
      {
        image: footerimg2,
        heading: "Jharkhand Breaking News Live: सीएम हेमंत सोरेन ने 827",
        id: 56,
        date: "Oct., 2023",
      },
      {
        image: footerimg3,
        heading: "अमर कुमार बाउरी बने झारखंड बीजेपी विधायक दल के नेता, जेपी",
        id: 56,
        date: "Oct., 2023",
      },
      {
        image: footerimg2,
        heading: "बीजेपी की संकल्प यात्रा के समापन पर चर्चा, रांची में",
        id: 56,
        date: "Oct., 2023",
      },
      {
        image: footerimg3,
        heading: "विनिता घोष वतन वापस आई, इजरायल में युद्ध के बीच फंसी थी",
        id: 56,
        date: "Oct., 2023",
      },
    ],

    rightMenu: 
      {
        header: "",
        source: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        heading: "Durga Puja 2023: चक्रव्यूह को पार कर श्रद्धालु मां का कर पाएंगे दर्शन, बकरी बाजार में दिखेगा भव्य पूजा पंडाल",
        content: "रांची : राजधानी रांची में दुर्गा पूजा को लेकर काफी धूम देखा जा रहा है. कई भव्य पंडाल बन रहे हैं जो लोगों को काफी	",
        author: "Kanhaiya Taleja",
        id: 56,
        date: "Oct 17, 2023",
      }
    }

    ]

  let breakingNews = "राज्यसभा में भी महिला आरक्षण विधेयक पारित, महिला सांसदों ने PM मोदी के साथ मनाया जश्न"

  const getDetailFun = (id) => {

    setPageToggle(true)

    return;
  console.log(id)
     axios.post(apiGetNewsById, {id: id}, ApiJsonHeader)
    .then((res) => {
      console.log("Page response => ", res)
      if(res?.data?.status){
        setPageData(res?.data?.data)
        setPageToggle(true)
      }
    })
    
  }

  return (
    <div className='relative'>
      <BrandingIndex wpx={wpx} menu={brandingMenu} />
      <div className='h-[1.7rem]'></div>
      <NewsCategoriesIndex wpx={wpx} menu={newsCategoriesMenu} />
      {bClose && <BreakingNewsIndex wpx={wpx} bnews={breakingNews} bClose={(status) => setBClose(status)} />}
      
      {
        !pageToggle && data?.map((elem, index) => <>
          <HomeLayout key={index} data={elem} wpx={wpx} getFun={(id) => getDetailFun(id)}/>
        </>)
      }

      {
        pageToggle &&  <ContentIndex data={pageData} wpx={wpx} getBack={() => setPageToggle(false)}/>
      }

      <Footerlayout />
    </div>
  )
}

export default HomeIndex