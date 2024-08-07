import { useEffect, useState } from "react";
import FilterDate from "./filter-date";
import ChartMain from "./chart-diogram";
import { ApiService } from "../../components/api.server";
import Transaction from "./transaction";
import TransactionPay from "./transaction-pay";
import { FaPlus } from "react-icons/fa";
import AddVabModal from "./add-vab";

const History = () => {
  const [transaction, setTransaction] = useState(false);
  const [addVab, setAddVab] = useState(false);
  const [historyVab, setHistoryVab] = useState({
    series: [{ name: "VAB Series", data: [] }],
    categories: [],
  });
  const [filter, setFilter] = useState("MONTHLY"); // Default filter value

  const onFilterChange = (selectedKey) => {
    setFilter(selectedKey);
  };

  const handleAddVab = () => {
    setAddVab(!addVab);
  };

  const handleTransaction = () => {
    setTransaction(!transaction);
  };

  useEffect(() => {
    const register = JSON.parse(localStorage.getItem("register"));
    const fetchVab = async () => {
      try {
        const res = await ApiService.getData(
          `/vab/9`, // No filter here
          register?.access
        );
        console.log("Fetched data:", res);

        // Process data based on the selected filter
        const now = new Date();
        let seriesData = [];
        let categoriesData = [];

        if (filter === "MONTHLY") {
          // Filter monthly data
          seriesData = res.history
            .filter((item) => {
              const itemDate = new Date(item.data);
              return (
                itemDate.getMonth() === now.getMonth() &&
                itemDate.getFullYear() === now.getFullYear()
              );
            })
            .map((item) => +item.vab);
          categoriesData = res.history
            .filter((item) => {
              const itemDate = new Date(item.data);
              return (
                itemDate.getMonth() === now.getMonth() &&
                itemDate.getFullYear() === now.getFullYear()
              );
            })
            .map((item) => item.data);
        } else if (filter === "YEARLY") {
          // Filter yearly data
          seriesData = res.history
            .filter(
              (item) => new Date(item.data).getFullYear() === now.getFullYear()
            )
            .map((item) => +item.vab);
          categoriesData = res.history
            .filter(
              (item) => new Date(item.data).getFullYear() === now.getFullYear()
            )
            .map((item) => item.data);
        } else if (filter === "DAILY") {
          // Filter daily data
          seriesData = res.history
            .filter(
              (item) =>
                new Date(item.data).toDateString() === now.toDateString()
            )
            .map((item) => +item.vab);
          categoriesData = res.history
            .filter(
              (item) =>
                new Date(item.data).toDateString() === now.toDateString()
            )
            .map((item) => item.data);
        }

        setHistoryVab({
          series: [{ name: "VAB Series", data: seriesData }],
          categories: categoriesData,
        });
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchVab();
  }, [filter, addVab]);


  return (
    <main className="max-w-11/12 sm:px-4 flex flex-col gap-3">
      <section className="flex justify-between items-center gap-3">
        <h1 className="font-bold clam3 ">VAB history</h1>
        <div onClick={handleTransaction} className="max-sm:hidden">
          <Transaction />
        </div>
        <div className="flex gap-2">
          <>
            <button
              onClick={handleAddVab}
              className="md:hidden fixed bottom-[16px] right-[16px] bg-button-color flex justify-start items-center gap-2 rounded-full p-4 text-white shadow-btn_shadow"
            >
              <FaPlus />
            </button>
            <button
              onClick={handleAddVab}
              className="max-md:hidden bg-button-color flex justify-start items-center gap-2 rounded-[14px] py-2 px-4 text-white shadow-btn_shadow"
            >
              <FaPlus />
              <h1>Add Vab</h1>
            </button>
          </>
          <FilterDate onFilterChange={onFilterChange} />
        </div>
      </section>
      <section className="sm:hidden flex justify-end items-center">
        <div onClick={handleTransaction}>
          <Transaction />
        </div>
      </section>
      <section className="w-full overflow-hidden">
        <ChartMain
          series={historyVab.series}
          categories={historyVab.categories}
          filter={filter}
        />
      </section>
      <TransactionPay isOpen={transaction} handleClose={handleTransaction} />
      <AddVabModal isOpen={addVab} handleClose={handleAddVab} />
    </main>
  );
};

export default History;
