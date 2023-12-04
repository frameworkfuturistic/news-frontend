import React, { useEffect } from "react";
import HomeLayout from "./HomeLayout";
import axios from "axios";
import { ApiList } from "@/Components/Api/ApiList";
import ApiJsonHeader from "@/Components/Api/ApiJsonHeader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { newsJson } from "./NewsJson";
import Component13 from "../../Layouts/Component13";
import { useState } from "react";
import MukhyaSamachar from "../../Layouts/MukhyaSamachar";
import BreakingNewsIndex from "../BreakinNews/BreakingNewsIndex";
import toast from "react-hot-toast";
import { useContext } from "react";
import { contextVar } from "@/Components/Context/ContextVar";
import BarLoader from "@/Components/Common/Loaders/BarLoader";
import { codeCheck } from "@/Components/Common/PowerUpFunctions";
import Component01 from "../../Layouts/Component01";
import BrandLoader from "@/Components/Common/Loaders/BrandLoader";

const HomeIndex = () => {

  const { refresh } = useContext(contextVar)

  const { api_getActiveNewsList, api_getNews, api_getCategory, api_getTag } = ApiList();

  let wpx = JSON.parse(localStorage.getItem("layout"))?.Layout_width || "1366px";

  const navigate = useNavigate()

  const { type, name } = useParams()

  let userDetails = JSON.parse(localStorage.getItem('userDetails'))

  const [newsData, setnewsData] = useState([])
  const [bClose, setBClose] = useState(true)
  const [loader, setLoader] = useState(false)
  const [loader2, setLoader2] = useState(false)
  const [storyList, setstoryList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [mediaList, setMediaList] = useState([])

  const getActiveStories = () => {

    setLoader2(true)

    axios
    .post(api_getActiveNewsList, {}, ApiJsonHeader())
    .then((res) => {
      if (res?.data?.status) {
          setnewsData(res?.data?.data)
      } else {
        toast.error(res?.data?.message)
      }
    }).finally(() => setLoader2(false))
  };

  const getStoryList = () => {

    // setLoader(true)

    axios.post(api_getNews, {}, ApiJsonHeader()).then((res) => {
      console.log("story list response => ", res);
      if (res?.data?.status) {
        setstoryList(res?.data?.data)
      } else {
        toast.error(res?.data?.message)
      }
    })
      // .finally(() => setLoader(false))
  };

  const getCategoryList = () => {

    console.log("param data => ", type, name)

    setLoader(true)

    let payload = {

    }

    axios
      .post(api_getCategory, payload, ApiJsonHeader())
      .then((res) => {
        if (res?.data?.status) {
          if (type && type != 'edit') {
            setCategoryList(() => {
              return res?.data?.data?.filter(item => item?.id == type)
            })
          } else {
          console.log("enter second:", res?.data?.data)
            setCategoryList(res?.data?.data)
          }
        } else {
          // activateBottomErrorCard(true, checkErrorMessage(res?.data?.message))
        }
        console.log('category list response => ', res)
      })
      .catch((err) => {
        // activateBottomErrorCard(true, 'Server Error! Please try again later.')
        console.log('error category list => ', err)
      })
      .finally(() => {
        setLoader(false)
      })
  }

  // Function to get tag list
  const getMediaList = () => {

    // setLoader(true)

    let payload = {

    }

    axios
      .post(api_getTag, payload, ApiJsonHeader())
      .then((res) => {
        if (res?.data?.status) {
          setMediaList(() => {
            return res?.data?.data?.filter(item => item?.tag_name == 'vedio');
          })
        } else {
        }
        console.log('media list response => ', res)
      })
      .catch((err) => {
        console.log('error tag list => ', err)
      })
      .finally(() => {
        // setLoader(false)
      })
  }

  const location = useLocation()

  var flag = 0
  useEffect(() => {

    if(location?.pathname == '/mobile'){
      window.localStorage.setItem('device', 'mobile')
    }

    window.scroll(0, -100);
    
    flag = 1;
    flag <= 1 && getActiveStories()
    flag <= 1 && getStoryList()
    flag <= 1 && getCategoryList()
    flag <= 1 && getMediaList()
  }, [refresh, type])

  // C = Component
  // OT = One, Three
  // A = Serial

  // ['COTTP01', 'COTTP02', 'COTTP03', 'COTTP04']
  // ['COTA01', 'COTA02', 'COTA03', 'COTA04', 'COTA05', 'COTA06', 'COTA07', 'COTA08', 'COTA09', 'COTA10', 'COTA11', 'COTA12']
  // ['COTB01', 'COTB02', 'COTB03', 'COTB04', 'COTB05', 'COTB06', 'COTB07', 'COTB08', 'COTB09', 'COTB10', 'COTB11', 'COTB12']
  // ['COTC01', 'COTC02', 'COTC03', 'COTC04', 'COTC05', 'COTC06', 'COTC07', 'COTC08', 'COTC09', 'COTC10', 'COTC11', 'COTC12']
  // ['COTD01', 'COTD02', 'COTD03', 'COTD04', 'COTD05', 'COTD06', 'COTD07', 'COTD08', 'COTD09', 'COTD10', 'COTD11', 'COTD12']
  // ['COTE01', 'COTE02', 'COTE03', 'COTE04', 'COTE05', 'COTE06', 'COTE07', 'COTE08', 'COTE09', 'COTE10', 'COTE11', 'COTE12']
  // ['COTF01', 'COTF02', 'COTF03', 'COTF04', 'COTF05', 'COTF06', 'COTF07', 'COTF08', 'COTF09', 'COTF10', 'COTF11', 'COTF12']
  // ['COTG01', 'COTG02', 'COTG03', 'COTG04', 'COTG05', 'COTG06', 'COTG07', 'COTG08', 'COTG09', 'COTG10', 'COTG11', 'COTG12']
  // ['COTH01', 'COTH02', 'COTH03', 'COTH04', 'COTH05', 'COTH06', 'COTH07', 'COTH08', 'COTH09', 'COTH10', 'COTH11', 'COTH12']
  // ['COTI01', 'COTI02', 'COTI03', 'COTI04', 'COTI05', 'COTI06', 'COTI07', 'COTI08', 'COTI09', 'COTI10', 'COTI11', 'COTI12']
  // ['COTJ01', 'COTJ02', 'COTJ03', 'COTJ04', 'COTJ05', 'COTJ06', 'COTJ07', 'COTJ08', 'COTJ09', 'COTJ10', 'COTJ11', 'COTJ12']
  // ['COTK01', 'COTK02', 'COTK03', 'COTK04', 'COTK05', 'COTK06', 'COTK07', 'COTK08', 'COTK09', 'COTK10', 'COTK11', 'COTK12']

  return (
    <>

      {
        (loader || loader2) && <BrandLoader />
      }

      {
        (!loader && !loader2) &&
        <>

          {newsData?.filter(item => codeCheck(item?.section_renderer_code, 'COTTP') == true)?.length > 0 && bClose && <BreakingNewsIndex wpx={wpx} data={newsData?.filter(item => codeCheck(item?.section_renderer_code, 'COTTP') == true)} code={'COTTP'} bClose={(status) => setBClose(status)} />}

          {/* Hide and show component */}
          {(!type || type == 'edit') && (newsData?.filter(item => (codeCheck(item?.section_renderer_code, 'BR') == true && item?.is_visible == 1))?.length > 0 || (type == 'edit' && (userDetails?.usertype)?.toLowerCase() == 'admin')) && <Component01 categoryList={categoryList} storyList={storyList} data={newsData?.filter(item => codeCheck(item?.section_renderer_code, 'BR') == true && item?.is_visible == 1)} code={'BR'} />}

          {(!type || type == 'edit') && (newsData?.filter(item => codeCheck(item?.section_renderer_code, 'COTTP') == true)?.length > 0 || (type == 'edit' && (userDetails?.usertype)?.toLowerCase() == 'admin')) && <MukhyaSamachar mediaList={mediaList[0]} categoryList={categoryList} storyList={storyList} data={newsData?.filter(item => codeCheck(item?.section_renderer_code, 'COTTP') == true)} code={'COTTP'} />}

          {
            Array.isArray(categoryList) &&
            categoryList?.map((elem, index) =>
              <div className="md:p-4 2xl:p-0 p-0">
                <Component13 cdata={elem} storyList={[]} data={(!type || type == 'edit') ? newsData?.filter(item => item?.sequence == index + 1) : newsData?.filter(item => item?.category_id == type)} code={elem?.renderer_code} />
              </div>)
          }
        </>
      }

      {/* <Component13    storyList={storyList} data={newsData?.filter(item => item?.sequence == 2)}  code={'COTB'} />
  <Component13    storyList={storyList} data={newsData?.filter(item => item?.sequence == 3)}  code={'COTC'} />
  <Component13    storyList={storyList} data={newsData?.filter(item => item?.sequence == 4)}  code={'COTD'} />
  <Component13    storyList={storyList} data={newsData?.filter(item => item?.sequence == 5)}  code={'COTE'} />
  <Component13    storyList={storyList} data={newsData?.filter(item => item?.sequence == 6)}  code={'COTF'} />
  <Component13    storyList={storyList} data={newsData?.filter(item => item?.sequence == 7)}  code={'COTG'} />
  <Component13    storyList={storyList} data={newsData?.filter(item => item?.sequence == 8)}  code={'COTH'} />
  <Component13    storyList={storyList} data={newsData?.filter(item => item?.sequence == 9)}  code={'COTI'} />
  <Component13    storyList={storyList} data={newsData?.filter(item => item?.sequence == 10)} code={'COTJ'} />
  <Component13    storyList={storyList} data={newsData?.filter(item => item?.sequence == 11)} code={'COTK'} /> */}


    </>
  )
}

export default HomeIndex;
