import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useState } from "react";
import { ApiService } from "../../components/api.server";
import SimpleLoading from "../../components/loader/simple-loading";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { eventSliceAction } from "../../reducer/event";

export default function TakeOverUser({
  isOpen,
  handleClose,
  item,
  status,
  reject,
}) {
  const register = JSON.parse(localStorage.getItem("register"));
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleAddVabUsers = async (item) => {
    try {
      await Promise.all(
        item.users.map(async (c) => {
          const vabPlus = item.user.find((d) => +d.user === c.id);
          if (vabPlus) {
            await ApiService.patchData(
              `/users/${c.id}`,
              {
                vab: +c.vab + +vabPlus.vab,
              },
              register?.access
            );
          }
        })
      );

      dispatch(eventSliceAction());
      toast.success(
        status === "take_over"
          ? "Task mastered successfully!"
          : "Task successfully finished!!!",
        {
          style: {
            backgroundColor: "green",
            border: "1px solid green",
            padding: "16px",
            color: "#fff",
          },
          position: "right-top",
          iconTheme: {
            primary: "#fff",
            secondary: "green",
          },
        }
      );
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = () => {
    const deleteFetch = async () => {
      setLoading(true);
      const takeOver = {
        definition: item.definition,
        name: item.name,
        status: "Expected",
        user: [
          {
            user: register.user_id,
            vab: item.vab,
          },
        ],
        group_id: 1,
      };
      const finishedTask = {
        definition: item.definition,
        name: item.name,
        status: "Finished",
        user: item.user,
      };
      const DoneTasks = {
        definition: item.definition,
        name: item.name,
        status: "Done",
        user: item.user,
      };
      try {
        if (reject) {
          await ApiService.putData(
            `/tasks/${item.id}`,
            {
              definition: item.definition,
              name: item.name,
              status: "Expected",
              user: item.user,
            },
            register?.access
          );
          dispatch(eventSliceAction());
          toast.success("Task successfully rejected!!!", {
            style: {
              backgroundColor: "red",
              border: "1px solid red",
              padding: "16px",
              color: "#fff",
            },
            position: "right-top",
            iconTheme: {
              primary: "#fff",
              secondary: "red",
            },
          });
          handleClose();
          return null;
        }

        await ApiService.putData(
          `/tasks/${item.id}`,
          status === "Asked"
            ? takeOver
            : status === "Expected"
            ? finishedTask
            : DoneTasks,
          register?.access
        );
        if (status === "Finished") {
          await handleAddVabUsers(item);
          return;
        }
        dispatch(eventSliceAction());
        toast.success(
          status === "take_over"
            ? "Task mastered successfully!"
            : "Task successfully finished!!!",
          {
            style: {
              backgroundColor: "green",
              border: "1px solid green",
              padding: "16px",
              color: "#fff",
            },
            position: "right-top",
            iconTheme: {
              primary: "#fff",
              secondary: "green",
            },
          }
        );
        handleClose();
      } catch (error) {
        console.error("Error deleting tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    deleteFetch();
  };

  return (
    <Transition appear show={isOpen}>
      <Dialog
        as="div"
        className="relative z-[998] focus:outline-none"
        onClose={handleClose}
      >
        <div className="fixed inset-0 z-[999] w-screen overflow-y-auto bg-black/50">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              <DialogPanel className="w-full max-w-md rounded-xl bg-card p-6 backdrop-blur-2xl">
                <DialogTitle
                  as="h3"
                  className="text-clamp2 font-medium text-text-primary"
                >
                  {status === "Asked"
                    ? "Mastering the task"
                    : status === "Expected"
                    ? "Complete the task"
                    : "Confirmation of completion"}
                </DialogTitle>
                <p className="mt-2 text-sm/6 text-thin-color">
                  {status === "Asked"
                    ? "Do you really want to take this task all to yourself?"
                    : status === "Expected"
                    ? "Do you sure you want to complete the task?"
                    : "Are you sure you have completed the task?"}
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
                    onClick={handleDelete}
                  >
                    {loading ? (
                      <div className="flex justify-start items-center gap-2 opacity-[0.8]">
                        <SimpleLoading />
                        <h1>Loading...</h1>
                      </div>
                    ) : (
                      <h1>Yes</h1>
                    )}
                  </Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
