import React, { useState, useEffect } from "react";
import { emptygrouplogo } from "../../images";
import { FaArrowLeft, FaCalendar } from "react-icons/fa";
import { motion } from "framer-motion";
import { ApiService } from "../../components/api.server";
import { useParams } from "react-router-dom";
import Loader1 from "../../components/loader/loader1";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Countdown, { getLocalISOString } from "../../components/count-down";
import SimpleLoading from "../../components/loader/simple-loading";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { eventSliceAction } from "../../reducer/event";
import Winner from "./winner";
import { IoTime } from "react-icons/io5";

const NowAuction = () => {
  const { id, aukt_id } = useParams();
  const dispatch = useDispatch();
  const { userData, eventSliceBool } = useSelector((state) => state.event);
  const register = JSON.parse(localStorage.getItem("register"));
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({});
  const [addVabLoading, setAddVabLoading] = useState(false);
  const [addVab, setAddVab] = useState({
    vab: null,
    buyum_id: id,
    user_id: register?.user_id,
  });
  const [applicants, setApplicants] = useState([]);
  const [topBidder, setTopBidder] = useState(null);
  const [maxVab, setMaxVab] = useState(0);
  const [addVabModal, setAddVabModal] = useState(false);

  const handleAddVabModal = () => {
    if (addVab.vab <= 0) {
      toast.error("Vab must be a positive number!");
      return;
    }
    if (item?.boshlangich_narx > addVab.vab) {
      toast.error(`Minimum vab ${item?.boshlangich_narx}!`);
      return;
    }
    if (userData?.vab < addVab.vab) {
      toast.error(`Not enough vab!Your vab is ${userData?.vab}`);
      return;
    }
    setAddVabModal(!addVabModal);
  };

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const items = await ApiService.getData(
          `/buyum/${id}`,
          register?.access
        );
        if (items.buyumusers) {
          const vabs = await Promise.all(
            items.buyumusers.map(async (userId) =>
              ApiService.getData(`/buyumusers/${userId}`, register?.access)
            )
          );
          if (vabs) {
            const users = await Promise.all(
              vabs.map(async (item) =>
                ApiService.getData(`/users/${item?.user_id}`, register?.access)
              )
            );
            const combinedData = vabs.map((vab) => ({
              user: users.find((c) => +c.id === +vab.user_id),
              vab: vab.vab,
              buyumuser_id: vab.id,
            }));

            // Sort the applicants based on VAB in descending order
            const sortedApplicants = combinedData.sort((a, b) => b.vab - a.vab);

            // Set the highest bidder's name and VAB
            if (sortedApplicants.length > 0) {
              setTopBidder(sortedApplicants[0].user);
              setMaxVab(sortedApplicants[0].vab);
            }

            setApplicants(sortedApplicants);
          }
        }
        setItem(items);
      } catch (error) {
        toast.error("Failed to fetch item details.");
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id, register?.access, eventSliceBool]);

  const handleAddVab = async () => {
    try {
      setAddVabLoading(true);
      const filterVab = applicants.find((c) => +c.user.id === addVab.user_id);
      if (filterVab?.user) {
        // Update vab
        const update = await ApiService.patchData(
          `/buyumusers/${filterVab?.buyumuser_id}`,
          {
            vab: addVab.vab,
          },
          register?.access
        );
        if (update) {
          toast.success("VAB updated successfully!");
          dispatch(eventSliceAction());
        }
      } else {
        // Add vab
        const res = await ApiService.postData(
          `/buyumusers`,
          addVab,
          register?.access
        );
        if (res.id) {
          const update = await ApiService.patchData(
            `/buyum/${id}`,
            { buyumusers: [...item.buyumusers, res.id] },
            register?.access
          );
          if (update) {
            toast.success("Successfully added vab!");
            dispatch(eventSliceAction());
          }
        }
      }
    } catch (error) {
      toast.error("Failed to add vab!");
      console.log(error);
    } finally {
      // Reset the input field
      setAddVab({
        vab: null,
        buyum_id: id,
        user_id: register?.user_id,
      });
      setAddVabLoading(false);
    }
  };

  useEffect(() => {
    const updateAuction = async () => {
      try {
        if (item?.end_time && getLocalISOString() > item.end_time) {
          const auktsion = await ApiService.getData(
            `/auktsion/${aukt_id}`,
            register?.access
          );
          if (auktsion.yutganlar?.find((c) => +c.buyum.id === +id)) {
            return null;
          }

          if (auktsion) {
            const winnerUser = {
              user: topBidder,
              narxi: maxVab,
              buyum: item,
            };
            const winner = applicants[0];

            const res = await ApiService.patchData(
              `/auktsion/${aukt_id}`,
              {
                yutganlar: [
                  ...(auktsion.yutganlar ? auktsion.yutganlar : []),
                  winnerUser,
                ],
              },
              register?.access
            );

            if (res) {
              const updatedUser = await ApiService.patchData(
                `/users/${winner.user.id}`,
                { vab: winner.user.vab - winner.vab },
                register?.access
              );
              toast.success("Auction updated with the winner!");
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    updateAuction();
  }, [
    item?.end_time,
    topBidder,
    maxVab,
    id,
    aukt_id,
    register?.access,
    applicants,
  ]);

  return (
    <>
      {loading ? (
        <Loader1 />
      ) : (
        <div className="sm:px-4">
          <button
            className="py-2 flex justify-start items-center gap-2 text-blue-600"
            onClick={() => window.history.back()}
          >
            <FaArrowLeft className="text-[14px]" />
            <p className="text-[14px]">Back to back</p>
          </button>
          <main className="relative h-full min-h-[calc(100vh-150px)] w-full bg-card rounded-xl shadow-btn_shadow">
            <section className="bg-background-secondary rounded-md">
              <div className="grid grid-cols-3 gap-4 rounded-md sm:p-4">
                <div className="col-span-1 max-sm:col-span-3 sm:col-span-1 lg:col-span-1 h-[150px] object-cover">
                  <img
                    className="w-full h-full object-cover rounded-md"
                    src={item?.img || emptygrouplogo}
                    alt="Item"
                  />
                </div>
                <div className="col-span-1 max-sm:col-span-3 sm:col-span-2 lg:col-span-1 flex justify-between flex-col w-full h-full gap-2">
                  <h1 className="text-xl font-bold">{item?.name}</h1>
                  <div className="w-full h-full">
                    <div className="w-full inline-flex justify-between gap-2 p-2 bg-green-400 rounded-md m-1">
                      <p className="font-bold text-white">Start</p>
                      <div className="text-white text-[12px] flex justify-start gap-1 items-center">
                        <FaCalendar />
                        {item?.start_time?.split("T")[0]}
                        <IoTime />
                        {item?.start_time?.split("T")[1].slice(0, 5)}
                      </div>
                    </div>
                    <div className="w-full inline-flex justify-between gap-2 p-2 bg-red-400 rounded-md m-1">
                      <p className="font-bold text-white">End</p>
                      <div className="text-white text-[12px] flex justify-start gap-1 items-center">
                        <FaCalendar />
                        {item?.end_time?.split("T")[0]}
                        <IoTime />
                        {item?.end_time?.split("T")[1].slice(0, 5)}
                      </div>
                    </div>
                  </div>

                  <div className="text-red-400 bg-background p-2 rounded-md flex justify-start items-center gap-1">
                    {getLocalISOString() < item.start_time ? (
                      <div>
                        <h1 className="text-text-primary font-bold">
                          It hasn't started yet{" "}
                        </h1>
                        <Countdown eventTime={item.start_time} />
                      </div>
                    ) : (
                      <h1 className="text-text-primary font-bold">
                        Almost finished :
                      </h1>
                    )}
                    {getLocalISOString() > item?.start_time && (
                      <Countdown
                        status={"for_finish"}
                        eventTime={item.end_time}
                      />
                    )}
                  </div>
                </div>

                <div className="overflow-x-auto col-span-2 max-sm:col-span-3 sm:col-span-3 lg:col-span-2 mb-2">
                  <table className="min-w-full bg-card shadow-sm overflow-hidden">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 border-b border-hr-color text-start">
                          Min VAB
                        </th>
                        <th className="px-4 py-2 border-b border-hr-color text-start">
                          Max VAB
                        </th>
                        <th className="px-4 py-2 border-b border-hr-color text-start">
                          Top Bidder:
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-card"
                      >
                        <td className="px-4 py-2 border-b border-hr-color font-bold">
                          {item?.boshlangich_narx}
                        </td>
                        <td className="px-4 py-2 border-b border-hr-color">
                          <div className="flex items-center">${maxVab}</div>
                        </td>
                        <td className="px-4 py-2 border-b border-hr-color text-green-600 font-bold">
                          {topBidder?.email}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {getLocalISOString() > item?.end_time && (
                <section className="col-span-6 py-4">
                  <Winner
                    maxVab={maxVab}
                    topBidder={topBidder?.email}
                    winnerImg={item?.img || emptygrouplogo}
                  />
                </section>
              )}
            </section>

            <section className="overflow-x-auto p-4 max-sm:mb-10 sm:pb-14">
              <h1 className="font-bold clamp3">Applicants</h1>
              <table className="min-w-full bg-card rounded-xl shadow-sm">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b border-hr-color text-start">
                      N
                    </th>
                    <th className="px-4 py-2 border-b border-hr-color text-start">
                      Email
                    </th>
                    <th className="px-4 py-2 border-b border-hr-color text-start">
                      VAB
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {applicants?.map((applicant, idx) => (
                    <motion.tr
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-card"
                    >
                      <td className="px-4 py-2 border-b border-hr-color font-bold">
                        {idx + 1}
                      </td>
                      <td className="px-4 py-2 border-b border-hr-color">
                        <div className="flex items-center">
                          {applicant?.user?.email}
                        </div>
                      </td>
                      <td className="px-4 py-2 border-b border-hr-color text-green-600 font-bold">
                        ${applicant?.vab}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </section>
            <section className="fixed max-sm:bg-background sm:absolute bottom-0 right-0 flex w-full justify-end items-end rounded-md p-2">
              <div className="w-full h-full flex justify-between items-center gap-4">
                <input
                  onChange={(e) =>
                    setAddVab({ ...addVab, vab: Number(e.target.value) || "" })
                  }
                  type="number"
                  value={addVab.vab}
                  className="shadow-btn_shadow bg-card w-full p-2 border rounded-md focus:outline-none border-border focus:border-primary"
                  placeholder="Enter your vab"
                  disabled={
                    getLocalISOString() > item?.end_time ||
                    getLocalISOString() < item.start_time
                  }
                />
                <div className="flex justify-end items-center">
                  <button
                    disabled={
                      addVabLoading ||
                      addVab?.vab <= 0 ||
                      getLocalISOString() > item?.end_time ||
                      getLocalISOString() < item.start_time
                    }
                    onClick={handleAddVabModal}
                    className={`${
                      addVabLoading ||
                      (addVab?.vab <= 0 || getLocalISOString() > item?.end_time
                        ? "opacity-[0.7]"
                        : "hover:bg-blue-700")
                    } whitespace-nowrap w-full shadow-btn_shadow p-2 bg-blue-600 text-white rounded-md `}
                  >
                    {addVabLoading ? <SimpleLoading /> : "Add Vab"}
                  </button>
                </div>
              </div>
            </section>
          </main>
          <ExitModal
            isOpen={addVabModal}
            handleClose={handleAddVabModal}
            handleAddVab={handleAddVab}
          />
        </div>
      )}
    </>
  );
};

export default NowAuction;

function ExitModal({ isOpen, handleClose, handleAddVab }) {
  const handleLogOut = () => {
    handleAddVab();
    handleClose();
  };

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-[998] focus:outline-none"
        onClose={handleClose}
      >
        <div className="fixed inset-0 z-[999] w-screen overflow-y-auto bg-black/50">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-md rounded-xl bg-card p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
              <DialogTitle
                as="h3"
                className="text-clamp2 font-medium text-text-primary"
              >
                Add VAB
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-thin-color">
                Are you sure you want to add this VAB?
              </p>
              <div className="mt-4 flex justify-between items-center gap-3">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={handleClose}
                >
                  No
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-red-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-red-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={handleLogOut}
                >
                  Yes
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
