import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import SimpleLoading from "../../components/loader/simple-loading";
import { ApiService } from "../../components/api.server";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import FilterDate from "./filter-date";
import ChartMain from "./chart-diogram";
import AddVabModal from "./add-vab";
import { useSelector } from "react-redux";

export default function VabHistory({ isOpen, handleClose }) {
  const { userData } = useSelector((state) => state.event);
  const { role } = userData;
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("MONTHLY");
  const [addVab, setAddVab] = useState(false);
  const [historyVab, setHistoryVab] = useState({
    series: [{ name: "VAB Series", data: [] }],
    categories: [],
  });

  const onFilterChange = (selectedKey) => {
    setFilter(selectedKey);
  };

  const handleCloseModal = () => {
    if (!addVab) {
      handleClose();
    }
  };

  const handleAddVab = () => {
    setAddVab(!addVab);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const register = JSON.parse(localStorage.getItem("register"));
        const res = await ApiService.getData(`/vab/1`, register?.access);

        const now = new Date();
        let seriesData = [];
        let categoriesData = [];

        if (filter === "MONTHLY") {
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

        // Check for NaN values and log the data for debugging
        console.log("Series Data:", seriesData);
        console.log("Categories Data:", categoriesData);

        // Filter out any NaN values from the data
        seriesData = seriesData.filter((value) => !isNaN(value));
        categoriesData = categoriesData.filter((value) => value);

        setHistoryVab({
          series: [{ name: "VAB Series", data: seriesData }],
          categories: categoriesData,
        });
      } catch (error) {
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filter, addVab]);
  console.log(role);
  return (
    <>
      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          className="relative z-[996] focus:outline-none"
          onClose={handleCloseModal}
        >
          <div className="fixed inset-0 z-[997] w-screen overflow-y-auto bg-black/50">
            {loading && (
              <div className="fixed inset-0 z-[1009] w-screen overflow-y-auto bg-transparent">
                <SimpleLoading />
              </div>
            )}
            <div className="flex w-full h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform scale-95"
                enterTo="opacity-100 transform scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform scale-100"
                leaveTo="opacity-0 transform scale-95"
              >
                <DialogPanel className="w-full h-full rounded-xl bg-card p-6 backdrop-blur-2xl">
                  <DialogTitle as="h3" className="text-base font-medium">
                    <div className="flex items-end justify-between">
                      <h1 className="font-semibold">VAB history</h1>
                      <button
                        onClick={handleCloseModal}
                        className="p-2 bg-background-secondary rounded-full"
                      >
                        <IoClose className="text-text-primary text-xl" />
                      </button>
                    </div>
                  </DialogTitle>
                  <div>
                    {role?.vab_edit ? (
                      <div className="flex gap-2 justify-end mt-2">
                        <button
                          onClick={handleAddVab}
                          className="md:hidden fixed bottom-4 right-4 bg-button-color flex items-center gap-2 rounded-full p-4 text-white shadow-btn_shadow"
                        >
                          <FaPlus />
                        </button>
                        <button
                          onClick={handleAddVab}
                          className="hidden md:flex bg-button-color items-center gap-2 rounded-md py-2 px-4 text-white shadow-btn_shadow"
                        >
                          <FaPlus />
                          <span>Add Vab</span>
                        </button>
                        <FilterDate onFilterChange={onFilterChange} />
                      </div>
                    ) : (
                      <div className="w-full flex justify-end mt-2 ">
                        <FilterDate onFilterChange={onFilterChange} />
                      </div>
                    )}
                    <section className="w-full overflow-hidden">
                      <ChartMain
                        series={historyVab.series}
                        categories={historyVab.categories}
                        filter={filter}
                      />
                    </section>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
      <AddVabModal isOpen={addVab} handleClose={handleAddVab} />
    </>
  );
}
