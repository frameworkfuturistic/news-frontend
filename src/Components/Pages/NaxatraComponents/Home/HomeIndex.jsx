import React, { useEffect } from "react";
import HomeLayout from "./HomeLayout";
import axios from "axios";
import { ApiList } from "@/Components/Api/ApiList";
import { ApiJsonHeader } from "@/Components/Api/ApiJsonHeader";
import { useNavigate } from "react-router-dom";
import { newsJson } from "./NewsJson";
import Component13 from "../../Layouts/Component13";

const HomeIndex = () => {
  const { apiGetNewsById, apiGetNews   } = ApiList();

  let wpx = JSON.parse(localStorage.getItem("layout"))?.Layout_width || "1366px";

  const navigate = useNavigate()

  const getDetailFun = (id, index) => {

    navigate(`/news-details/${id}/${index}`)

    return;
    console.log(id);
    axios.post(apiGetNewsById, { id: id }, ApiJsonHeader).then((res) => {
      console.log("Page response => ", res);
      if (res?.data?.status) {
        setPageData(res?.data?.data);
        setPageToggle(true);
      }
    });
  };

  useEffect(() => {
    axios.post(apiGetNews, {}, ApiJsonHeader).then((res) => {
      console.log("Page response => ", res);
      if (res?.data?.status) {
      }
    });
  },[])

  return (
    <>

    {
      newsJson?.map((elem, index) => 
      <>
        {elem?.news?.length > 0 && <Component13 key={index} index={index} data={elem} />}
      </>)
    }

      

      {/* {
        newsJson?.map((elem, index) => <>
          <HomeLayout key={index} index={index} data={elem} wpx={wpx} getFun={(id, index) => getDetailFun(id, index)} />
        </>)
      } */}

    </>
  )
}

export default HomeIndex;
