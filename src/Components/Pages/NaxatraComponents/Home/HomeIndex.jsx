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

const HomeIndex = () => {

  const { refresh } = useContext(contextVar)

  const { api_getActiveNewsList } = ApiList();

  let wpx = JSON.parse(localStorage.getItem("layout"))?.Layout_width || "1366px";

  const navigate = useNavigate()

  const { type } = useParams()

  const [newsData, setnewsData] = useState([])
  const [bClose, setBClose] = useState(true)
  const [loader, setLoader] = useState(false)

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

  useEffect(() => {
    getActiveStories()
  }, [refresh])


  return (
    <>

      {loader && <BarLoader />}

      {/*  !loader && Array.isArray(newsData) && newsData?.map((elem, index) => */}

      {
        !loader && Array.isArray(newsData?.news) && newsData?.news[0]?.news?.map((elem, index) =>
          <>

            {elem?.section_renderer_code == 'TP01' && bClose && <BreakingNewsIndex wpx={wpx} bnews={elem?.story_body} bClose={(status) => setBClose(status)} />}


            <MukhyaSamachar code={'TP'} />
           
            <Component13 code={'A'} />
            <Component13 code={'B'} />
            <Component13 code={'C'} />
            <Component13 code={'D'} />
            <Component13 code={'E'} />
            <Component13 code={'F'} />
            <Component13 code={'G'} />
            <Component13 code={'H'} />
            <Component13 code={'I'} />
            <Component13 code={'J'} />
            <Component13 code={'K'} />

          </>)
      }


    </>
  )
}

export default HomeIndex;
