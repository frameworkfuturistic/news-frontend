import React, { useEffect } from "react";
import HomeLayout from "./HomeLayout";
import axios from "axios";
import { ApiList } from "@/Components/Api/ApiList";
import ApiJsonHeader from "@/Components/Api/ApiJsonHeader";
import { useNavigate, useParams } from "react-router-dom";
import { newsJson } from "./NewsJson";
import Component13 from "../../Layouts/Component13";
import { useState } from "react";
import MukhyaSamachar from "../../Layouts/MukhyaSamachar";
import BreakingNewsIndex from "../BreakinNews/BreakingNewsIndex";
import toast from "react-hot-toast";
import { useContext } from "react";
import { contextVar } from "@/Components/Context/ContextVar";
import BarLoader from "@/Components/Common/Loaders/BarLoader";
import { codeCheck } from "@/Components/Common/PowerUpFunctions";

const HomeIndex = () => {

  const { refresh } = useContext(contextVar)

  const { api_getActiveNewsList, api_getNews } = ApiList();

  let wpx = JSON.parse(localStorage.getItem("layout"))?.Layout_width || "1366px";

  const navigate = useNavigate()

  const { type } = useParams()

  const [newsData, setnewsData] = useState([])
  const [bClose, setBClose] = useState(true)
  const [loader, setLoader] = useState(false)
  const [storyList, setstoryList] = useState([])

  const getActiveStories = () => {

    setLoader(true)

    axios.post(api_getActiveNewsList, {}, ApiJsonHeader()).then((res) => {
      console.log("Page response => ", res);
      if (res?.data?.status) {
        setnewsData(res?.data?.data)
      } else {
        toast.error(res?.data?.message)
      }
    }).finally(() => setLoader(false))
  };

  const getStoryList = () => {

    setLoader(true)

    axios.post(api_getNews, {}, ApiJsonHeader()).then((res) => {
      console.log("Page response => ", res);
      if (res?.data?.status) {
        setstoryList(res?.data?.data)
      } else {
        toast.error(res?.data?.message)
      }
    })
    .finally(() => setLoader(false))
  };

  var flag = 0
  useEffect(() => {
    flag = 1;
    flag <= 1 && getActiveStories()
    flag <= 1 && getStoryList()
  }, [refresh])

  if(loader){
    return <BarLoader />
  }

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

            {bClose && <BreakingNewsIndex wpx={wpx} data={newsData?.filter(item => codeCheck(item?.section_renderer_code, 'COTTP') == true)} code={'COTTP'} bClose={(status) => setBClose(status)} />}

            <MukhyaSamachar storyList={storyList} data={newsData?.filter(item => codeCheck(item?.section_renderer_code, 'COTTP') == true)} code={'COTTP'} />
            <Component13    storyList={storyList} data={newsData?.filter(item => codeCheck(item?.section_renderer_code, 'COTA')  == true)} code={'COTA'} />
            <Component13    storyList={storyList} data={newsData?.filter(item => codeCheck(item?.section_renderer_code, 'COTB')  == true)} code={'COTB'} />
            <Component13    storyList={storyList} data={newsData?.filter(item => codeCheck(item?.section_renderer_code, 'COTC')  == true)} code={'COTC'} />
            <Component13    storyList={storyList} data={newsData?.filter(item => codeCheck(item?.section_renderer_code, 'COTD')  == true)} code={'COTD'} />
            <Component13    storyList={storyList} data={newsData?.filter(item => codeCheck(item?.section_renderer_code, 'COTE')  == true)} code={'COTE'} />
            <Component13    storyList={storyList} data={newsData?.filter(item => codeCheck(item?.section_renderer_code, 'COTF')  == true)} code={'COTF'} />
            <Component13    storyList={storyList} data={newsData?.filter(item => codeCheck(item?.section_renderer_code, 'COTG')  == true)} code={'COTG'} />
            <Component13    storyList={storyList} data={newsData?.filter(item => codeCheck(item?.section_renderer_code, 'COTH')  == true)} code={'COTH'} />
            <Component13    storyList={storyList} data={newsData?.filter(item => codeCheck(item?.section_renderer_code, 'COTI')  == true)} code={'COTI'} />
            <Component13    storyList={storyList} data={newsData?.filter(item => codeCheck(item?.section_renderer_code, 'COTJ')  == true)} code={'COTJ'} />
            <Component13    storyList={storyList} data={newsData?.filter(item => codeCheck(item?.section_renderer_code, 'COTK')  == true)} code={'COTK'} />

         
    </>
  )
}

export default HomeIndex;
