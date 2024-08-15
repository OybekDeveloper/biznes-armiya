import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";

const FilterHistory = ({ isOpen, handleClose, applyFilters }) => {
  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilterApply = () => {
    applyFilters({ type, startDate, endDate, }); // Pass an empty string for searchMessage
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <Transition appear show={isOpen}>
      <Dialog
        as="div"
        className="relative z-[998] focus:outline-none"
        onClose={handleClose}
      >
        <div className="fixed inset-0 z-[999] w-screen overflow-y-auto bg-black/50">
          <div className="flex min-h-full items-end justify-end">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform scale-95"
              enterTo="opacity-100 transform scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform scale-100"
              leaveTo="opacity-0 transform scale-95"
            >
              <Dialog.Panel className="w-full h-screen max-w-md rounded-xl p-4 sm:p-6 backdrop-blur-2xl bg-white">
                <h2 className="text-xl font-bold">Filter History</h2>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                  <div>
                    <label className="block">Type</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="">All</option>
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                  </div>
                  <div>
                    <label className="block">Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block">End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={handleClose}
                      className="px-4 py-2 rounded bg-gray-300 text-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleFilterApply}
                      className="px-4 py-2 rounded bg-blue-500 text-white"
                    >
                      Apply Filters
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FilterHistory;
