import { useState } from "react";
import Transaction from "./transaction";
import TransactionPay from "./transaction-pay";
import VabHistory from "./vab-history";
import { MdOutlineHistory } from "react-icons/md";

const History = () => {
  const [transaction, setTransaction] = useState(false);
  const [historyVab, setHistoryVab] = useState(false);

  const handleHistoryVab = () => {
    setHistoryVab(!historyVab);
  };

  const handleTransaction = () => {
    setTransaction(!transaction);
  };

  return (
    <main className="max-w-11/12 sm:px-4 flex flex-col gap-3">
      <section className="flex justify-between items-center gap-3">
        <h1 className="font-bold clam3 ">History</h1>
        <div onClick={handleTransaction} className="max-sm:hidden">
          <Transaction />
        </div>

        <button
          onClick={handleHistoryVab}
          className="flex bg-button-color items-center gap-2 rounded-md py-2 px-4 text-white shadow-btn_shadow"
        >
          <MdOutlineHistory className="text-xl" />
          <span>VAB</span>
        </button>
      </section>
      <section className="sm:hidden flex justify-end items-center">
        <div onClick={handleTransaction}>
          <Transaction />
        </div>
      </section>
      <section className="flex flex-col gap-3">
        {[1, 2, 3, 4, 5, 6, 7].map((task, i) => (
          <div
            to={`/project/${i}`}
            key={i}
            className="cursor-pointer hover:bg-hover-card bg-card shadow-btn_shadow rounded-[14px] w-full grid grid-cols-6 max-lg:grid-cols-3 max-xl:grid-cols-4 px-[24px] py-[16px] gap-3"
          >
            <div className="col-span-1">
              <p className="text-thin-color clamp4">Task name</p>
              <h1 className="text-text-primary font-bold">Sick Leave</h1>
            </div>
            <div className="col-span-1">
              <p className="text-thin-color clamp4">Estimate</p>
              <h1 className="text-text-primary font-[500]">1d 2h </h1>
            </div>
            <div className="col-span-1">
              <p className="text-thin-color clamp4">Deadline</p>
              <h1 className="text-text-primary font-[500]">Sep 13, 2020</h1>
            </div>
            <div className="col-span-1 flex flex-col">
              <p className="text-thin-color clamp4">Assignee</p>
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="col-span-1">
              <p className="text-thin-color clamp4">Priority</p>
              <h1 className="text-text-primary font-[500]">Sick Leave</h1>
            </div>
            <div className="col-span-1 flex justify-start items-center ">
              <div className="text-[12px] px-2 py-1 rounded-[14px] bg-yellow-500 text-white">
                Bajarilmoqda
              </div>
            </div>
          </div>
        ))}
      </section>

      <TransactionPay isOpen={transaction} handleClose={handleTransaction} />
      <VabHistory isOpen={historyVab} handleClose={handleHistoryVab} />
    </main>
  );
};

export default History;
