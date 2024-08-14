import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiService } from "../../components/api.server";
import Loader1 from "../../components/loader/loader1";
import { useSelector } from "react-redux";
import "./index.css";
const NewsItem = () => {
  const register = JSON.parse(localStorage.getItem("register"));
  const { id } = useParams();
  const { userData } = useSelector((state) => state.event);
  const [news, setNews] = useState({});
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const handleLikeNews = async () => {
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await ApiService.getData(
          `/yangiliklar/${id}`,
          register?.access
        );
        if (res.user_id.length > 0) {
          if (!res.user_id.filter((c) => +c === +userData.id)) {
            await ApiService.patchData(
              `/yangiliklar/${id}`,
              {
                user_id: [...res?.user_id, userData.id],
              },
              register?.access
            );
          }
        }

        setNews(res);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    const fetchLike = async () => {
      try {
        const res = await ApiService.getData(
          `/yangiliklar/${id}`,
          register?.access
        );
        await ApiService.patchData(
          `/yangiliklar/${id}`,
          {
            like: res.like + 1,
          },
          register?.access
        );
      } catch (error) {
        console.log(error);
      }
    };
    if (isLiked) {
      fetchLike();
    }
  }, [isLiked]);

  return (
    <>
      {loading ? (
        <Loader1 />
      ) : (
        <div className="overflow-hidden w-full  p-4 bg-card rounded-md cursor-pointer  shadow-btn_shadow">
          <div className="flex justify-between items-center">
            <h1 className="clamp3 font-bold">{news?.title}</h1>
            <div className={`p-2 rounded-md cursor-pointer`}>
              <label className="container1">
                <input
                  type="checkbox"
                  checked={isLiked}
                  onChange={handleLikeNews}
                />
                <svg
                  className="svg-like"
                  id="Glyph"
                  version="1.1"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M29.845,17.099l-2.489,8.725C26.989,27.105,25.804,28,24.473,28H11c-0.553,0-1-0.448-1-1V13  c0-0.215,0.069-0.425,0.198-0.597l5.392-7.24C16.188,4.414,17.05,4,17.974,4C19.643,4,21,5.357,21,7.026V12h5.002  c1.265,0,2.427,0.579,3.188,1.589C29.954,14.601,30.192,15.88,29.845,17.099z"
                    id="XMLID_254_"
                  ></path>
                  <path
                    d="M7,12H3c-0.553,0-1,0.448-1,1v14c0,0.552,0.447,1,1,1h4c0.553,0,1-0.448,1-1V13C8,12.448,7.553,12,7,12z   M5,25.5c-0.828,0-1.5-0.672-1.5-1.5c0-0.828,0.672-1.5,1.5-1.5c0.828,0,1.5,0.672,1.5,1.5C6.5,24.828,5.828,25.5,5,25.5z"
                    id="XMLID_256_"
                  ></path>
                </svg>
              </label>
            </div>
          </div>
          <div className="w-full h-full overflow-auto">
            <div dangerouslySetInnerHTML={{ __html: news?.content }}></div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsItem;
