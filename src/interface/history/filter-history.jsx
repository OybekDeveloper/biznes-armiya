import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useState } from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

export default function FilterHistory({ isOpen, handleClose, applyFilters }) {
  const [type, setType] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    applyFilters({ type, startDate, endDate });
    handleClose();
  };

  const handleReset = () => {
    setType("all");
    setStartDate(null);
    setEndDate(null);
    applyFilters({ type: "all", startDate: null, endDate: null });
    handleClose();
  };

  return (
    <Transition appear show={isOpen}>
      <Dialog
        as="div"
        className="relative z-[998] focus:outline-none"
        onClose={handleClose}
      >
        <div className="fixed inset-0 z-[999] w-screen overflow-y-auto bg-black/50">
          <div className="flex min-h-full items-end justify-end">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              <DialogPanel className="w-full h-screen max-w-md rounded-xl p-4 sm:p-6 backdrop-blur-2xl">
                <form
                  onSubmit={handleSubmit}
                  className="w-full h-full p-3 rounded-md bg-background space-y-4"
                >
                  <div>
                    <label>Type:</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full p-2 rounded border"
                    >
                      <option value="all">All</option>
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                  </div>
                  <div>
                    <label>Date Range:</label>
                    <DateRangePicker
                      startDate={startDate}
                      startDateId="start_date_id"
                      endDate={endDate}
                      endDateId="end_date_id"
                      onDatesChange={({ startDate, endDate }) => {
                        setStartDate(startDate);
                        setEndDate(endDate);
                      }}
                      focusedInput={focusedInput}
                      onFocusChange={(focusedInput) =>
                        setFocusedInput(focusedInput)
                      }
                      displayFormat="YYYY-MM-DD"
                      numberOfMonths={1}
                      isOutsideRange={() => false}
                      showClearDates={true}
                    />
                  </div>
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-4 py-2 rounded bg-gray-500 text-white"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded bg-blue-500 text-white"
                    >
                      Apply
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
