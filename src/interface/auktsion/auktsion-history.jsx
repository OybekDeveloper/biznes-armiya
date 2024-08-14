import React, { useEffect, useState } from "react";
import { ApiService } from "../../components/api.server";
import { useParams } from "react-router-dom";
import Loader1 from "../../components/loader/loader1";

const AuktionHistory = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [winnerAuktion, setWinnerAuktion] = useState([]);
  const register = JSON.parse(localStorage.getItem("register"));

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const auktsion = await ApiService.getData(
          `/auktsion/${id}`,
          register?.access
        );
        setWinnerAuktion(auktsion?.yutganlar ? auktsion.yutganlar : []);
        console.log(auktsion);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, []);

  if (loading) {
    return <Loader1 />;
  }

  return (
    <main>
      <h1 className="font-[500] clamp3">Winner auktion</h1>
      <div className="grid xl:grid-cols-5 lg:grid-cols-3 max-sm:grid-cols-1 sm:grid-cols-2 flex-1 gap-2">
        {winnerAuktion?.map((item, idx) => (
          <div
            className="w-full h-full bg-card rounded-[24px] p-[16px] flex flex-col justify-start items-center gap-1"
            key={idx}
          >
            <img
              src={item?.buyum?.img}
              alt="logo"
              className="mb-[10px] w-full h-[100px] object-cover rounded-md"
            />
            <h1 className="text-text-primary font-medium">
              {item?.buyum?.name}
            </h1>
            <p className="text-gray-500 font-bold">
              {item?.user?.first_name + " " + item?.user?.last_name}
            </p>
            <p className="text-gray-500">{item?.narxi}</p>
            <p className="text-gray-500 py-1 px-2 border-border border-[1px] rounded-[4px] text-[12px]">
              {item?.narxi} vab
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default AuktionHistory;
