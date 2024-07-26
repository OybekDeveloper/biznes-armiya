import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiService } from "../../components/api.server";
import Loader1 from "../../components/loader/loader1";

const NewsItem = () => {
  const { id } = useParams();
  const [news, setNews] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const register = JSON.parse(localStorage.getItem("register"));
    const fetchNews = async () => {
      try {
        const res = await ApiService.getData(
          `/yangiliklar/${id}`,
          register?.access
        );
        setNews(res);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <>
      {loading ? (
        <Loader1 />
      ) : (
        <div className="overflow-hidden w-full  p-4 bg-card rounded-md cursor-pointer  shadow-btn_shadow">
          <div className="w-full h-full overflow-auto">
            <div dangerouslySetInnerHTML={{ __html: news?.content }}></div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsItem;
