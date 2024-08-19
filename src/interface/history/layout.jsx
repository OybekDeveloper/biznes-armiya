import { useEffect, useState, useCallback } from "react";
import Transaction from "./transaction";
import TransactionPay from "./transaction-pay";
import VabHistory from "./vab-history";
import { MdOutlineHistory } from "react-icons/md";
import { ApiService } from "../../components/api.server";
import { FaSortAmountDownAlt, FaSortAmountUp } from "react-icons/fa";
import { LuFilter } from "react-icons/lu";
import { dataempty } from "../../images";
import { BiTransfer } from "react-icons/bi";
import Loader1 from "../../components/loader/loader1";
import { useSelector } from "react-redux";
import FilterHistory from "./filter-history";

const History = () => {
  const { eventSliceBool, userData, searchMessage } = useSelector(
    (state) => state.event
  );
  const register = JSON.parse(localStorage.getItem("register"));
  const [transaction, setTransaction] = useState(false);
  const [historyVab, setHistoryVab] = useState(false);
  const [transactionPay, setTransactionPay] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [historyBool, setHistoryBool] = useState(false);

  const handleHistoryVab = useCallback(() => {
    setHistoryVab((prev) => !prev);
  }, []);

  const handleTransaction = useCallback(() => {
    setTransaction((prev) => !prev);
  }, []);

  const handleFilterHistory = () => {
    setHistoryBool(!historyBool);
  };

  const applyFilters = useCallback(
    ({ type, startDate, endDate }) => {
      let filtered = transactionPay;

      if (type === "income") {
        filtered = filtered.filter(
          (item) => item.to_user.id === register?.user_id
        );
      } else if (type === "expense") {
        filtered = filtered.filter(
          (item) => item.from_user.id === register?.user_id
        );
      }

      if (startDate) {
        filtered = filtered.filter(
          (item) => new Date(item.date_created) >= new Date(startDate)
        );
      }

      if (endDate) {
        filtered = filtered.filter(
          (item) => new Date(item.date_created) <= new Date(endDate)
        );
      }

      setFilteredTransactions(filtered);
    },
    [transactionPay, register?.user_id]
  );

  useEffect(() => {
    const transactionFetch = async () => {
      try {
        const res = await ApiService.getData(
          `/tranzaksiya/get`,
          register.access
        );
        const filterRes = res.filter(
          (c) =>
            c.from_user.id === register?.user_id ||
            c.to_user.id === register?.user_id
        );
        setTransactionPay(filterRes);
        setFilteredTransactions(filterRes); // Initialize with unfiltered data
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    transactionFetch();
  }, [register.access, register.user_id, eventSliceBool]);

  if (loading) {
    return <Loader1 />;
  }
  return (
    <main className="max-w-11/12 sm:px-4 flex flex-col gap-3">
      <section className="flex justify-between items-center gap-3">
        <h1 className="font-bold clam3">History</h1>
        <div className="flex gap-2 max-sm:hidden">
          <div
            onClick={handleTransaction}
            aria-label="Toggle Transaction Modal"
          >
            <Transaction />
          </div>
          <div
            onClick={handleFilterHistory}
            className="p-[10px] rounded-[14px] bg-card cursor-pointer shadow-btn_shadow flex justify-center items-center"
          >
            <button aria-label="Filter">
              <LuFilter className="text-xl text-text-primary" />
            </button>
          </div>
        </div>

        <button
          onClick={handleHistoryVab}
          aria-label="Toggle VAB History"
          className="flex bg-button-color items-center gap-2 rounded-md py-2 px-4 text-white shadow-btn_shadow"
        >
          <MdOutlineHistory className="text-xl" />
          <span>VAB</span>
        </button>
      </section>

      <div className="gap-2 sm:hidden flex justify-end">
        <div onClick={handleTransaction} aria-label="Toggle Transaction Modal">
          <Transaction />
        </div>
        <div className="p-[10px] rounded-[14px] bg-card cursor-pointer shadow-btn_shadow flex justify-center items-center">
          <button onClick={handleFilterHistory} aria-label="Filter">
            <LuFilter className="text-xl text-text-primary" />
          </button>
        </div>
      </div>
      {filteredTransactions.length > 0 ? (
        <section className="grid grid-cols-2 max-xl:grid-cols-1 gap-3">
          {filteredTransactions
            .slice()
            .reverse()
            .map((item, i) => (
              <div
                key={i}
                className="cursor-pointer hover:bg-hover-card bg-card shadow-btn_shadow rounded-[14px] w-full grid grid-cols-3 px-[24px] py-[16px] gap-3"
              >
                <div className="col-span-1">
                  <p className="text-thin-color clamp4">User exchange</p>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h1
                        className={`${
                          item?.from_user.id === register.user_id && "font-bold"
                        }`}
                      >
                        {item.from_user.first_name} {item.from_user.last_name}
                        {!item.from_user.first_name &&
                          !item.from_user.last_name &&
                          "From user"}
                      </h1>
                    </div>
                    <div className="flex">
                      <BiTransfer />
                    </div>
                    <div className="flex items-center gap-2">
                      <h1
                        className={`${
                          item?.to_user.id === register.user_id && "font-bold"
                        }`}
                      >
                        {item.to_user.first_name} {item.to_user.last_name}
                        {!item.to_user.first_name &&
                          !item.to_user.last_name &&
                          "To user"}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <p className="text-thin-color clamp4">VAB Amount</p>
                  <div>
                    {item.to_user.id === register?.user_id && (
                      <div className="flex justify-start items-center gap-2 text-green-600">
                        <FaSortAmountUp />
                        <h1 className="text-xl font-bold">+{item.vab}</h1>{" "}
                      </div>
                    )}
                    {item.from_user.id === register?.user_id && (
                      <div className="flex justify-start items-center gap-2 text-red-600">
                        <FaSortAmountDownAlt />
                        <h1 className="text-xl font-bold">-{item.vab}</h1>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-span-1">
                  <p className="text-thin-color clamp4">Date</p>
                  <h1 className="text-text-primary font-[500]">
                    {new Date(item.date_created).toLocaleDateString()} <br />
                    <span className="text-thin-color">
                      {item.date_created.split("T")[1].slice(0, 8)}
                    </span>
                  </h1>{" "}
                </div>
              </div>
            ))}
        </section>
      ) : (
        <div className="w-full h-full flex justify-center items-center flex-col">
          <div className="w-full h-[200px]">
            <img
              className="w-full h-full object-contain"
              src={dataempty}
              alt="No data"
            />
          </div>
          <h1 className="clamp3 font-bold">Data do not exist!</h1>
        </div>
      )}

      <TransactionPay isOpen={transaction} handleClose={handleTransaction} />
      <VabHistory isOpen={historyVab} handleClose={handleHistoryVab} />
      <FilterHistory
        isOpen={historyBool}
        handleClose={handleFilterHistory}
        applyFilters={applyFilters}
      />
    </main>
  );
};

export default History;
