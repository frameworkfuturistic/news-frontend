import React, { useEffect } from "react";
import HomeLayout from "./HomeLayout";
import axios from "axios";
import { ApiList } from "@/Components/Api/ApiList";
import  ApiJsonHeader  from "@/Components/Api/ApiJsonHeader";
import { useNavigate, useParams } from "react-router-dom";
import { newsJson } from "./NewsJson";
import Component13 from "../../Layouts/Component13";
import { useState } from "react";
import MukhyaSamachar from "../../Layouts/MukhyaSamachar";

const HomeIndex = () => {
  const { apiGetNewsById, apiGetNews   } = ApiList();

  let wpx = JSON.parse(localStorage.getItem("layout"))?.Layout_width || "1366px";

  const navigate = useNavigate()

  const {type} = useParams()

  const [newsData, setnewsData ] = useState([])

  const getDetailFun = (id, index) => {

    navigate(`/news-details/${id}/${index}`)

    return;
    console.log(id);
    axios.post(apiGetNewsById, { id: id }, ApiJsonHeader()).then((res) => {
      console.log("Page response => ", res);
      if (res?.data?.status) {
        setPageData(res?.data?.data);
        setPageToggle(true);
      }
    });
  };

  useEffect(() => {
    // axios.post(apiGetNews, {}, ApiJsonHeader()).then((res) => {
    //   console.log("Page response => ", res);
    //   if (res?.data?.status) {
    //   }
    // });

    if(type && type != 'edit'){
      let data = newsJson?.filter(item => item?.categoryId == type)
      if(data[0]?.news?.length == 0){
        setnewsData(newsJson)
      } else {
        setnewsData(data)
      }
    } else {
      setnewsData(newsJson)
    }

  },[type])


  return (
    <>

{
      newsData?.length > 0 && newsData?.filter(item => item?.categoryId == 'MukhyaSamachar')?.map((elem, index) => 
      <>
        {elem?.news?.length > 0 && <MukhyaSamachar ind={index} key={index} data={elem} />}
      </>)
    }
    
    {
      newsData?.length > 0 && newsData?.filter(item => item?.categoryId != 'MukhyaSamachar')?.map((elem, index) => 
      <>
        {elem?.news?.length > 0 && <Component13 ind={index} key={index} data={elem} />}
      </>)
    }

    </>
  )
}

export default HomeIndex;
