import { useEffect, useState } from "react";
import FilterDate from "./filter-date";
import ChartMain from "./chart-diogram";
import { ApiService } from "../../components/api.server";
import Transaction from "./transaction";
import TransactionPay from "./transaction-pay";

const History = () => {
  const [transaction, setTransaction] = useState(false);
  const series = [
    {
      name: "series1",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
  ];
  const categories = [
    "2024-07-30T17:45:09.375Z",
    "2024-08-30T17:45:09.375Z",
    "2024-09-30T17:45:09.375Z",
    "2024-10-30T17:45:09.375Z",
    "2024-11-30T17:45:09.375Z",
    "2024-12-30T17:45:09.375Z",
    "2025-01-30T17:45:09.375Z",
  ]; // Ensure the categories match the data length

  const onFilterChange = () => {};

  const handleTransaction = () => {
    setTransaction(!transaction);
  };

  useEffect(() => {
    const register = JSON.parse(localStorage.getItem("register"));
    const fetchVab = async () => {
      try {
        const res = await ApiService.getData(`/vab`, register?.access);
        console.log(res);
      } catch (error) {
        console.log(error);
      } finally {
        // setLoading(false);
      }
    };
    fetchVab();
  }, []);

  return (
    <main className="max-w-11/12 sm:px-4 flex flex-col gap-3">
      <section className="flex justify-between items-center gap-3">
        <h1>VAB history</h1>
        <div onClick={handleTransaction} className="max-sm:hidden">
          <Transaction />
        </div>
        <FilterDate onFilterChange={onFilterChange} />
      </section>
      <section className="sm:hidden flex justify-end items-center">
      <div onClick={handleTransaction}>
          <Transaction />
        </div>
      </section>
      <section className="w-full overflow-hidden">
        <ChartMain series={series} categories={categories} />
      </section>
      <TransactionPay isOpen={transaction} handleClose={handleTransaction} />
    </main>
  );
};

export default History;
