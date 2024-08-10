import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { ApiService } from "../../components/api.server";
import { useEffect, useState } from "react";
import SimpleLoading from "../../components/loader/simple-loading";
import toast from "react-hot-toast";

export default function AddNews({ isOpen, handleClose, updateItem }) {
  const register = JSON.parse(localStorage.getItem("register"));
  const initialRoleState = {
    role: "",
    yang_views: false,
    yang_edit: false,
    yang_delete: false,
    request_views: false,
    request_edit: false,
    request_delete: false,
    sh_rivoj_views: false,
    sh_rivoj_edit: false,
    sh_rivoj_delete: false,
    price_views: false,
    price_edit: false,
    price_delete: false,
    vab_views: false,
    vab_edit: false,
    vab_delete: false,
    tasks_views: false,
    tasks_edit: false,
    tasks_delete: false,
    tasks_users_views: false,
    tasks_users_edit: false,
    tasks_users_delete: false,
    balls_views: false,
    balls_edit: false,
    balls_delete: false,
    h_balls_views: false,
    h_balls_edit: false,
    h_balls_delete: false,
    item_views: false,
    item_edit: false,
    item_delete: false,
    auction_views: false,
    auction_edit: false,
    auction_delete: false,
    chat_views: false,
    chat_edit: false,
    chat_delete: false,
    role_views: false,
    role_edit: false,
    role_delete: false,
  };

  const [role, setRole] = useState(initialRoleState);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (updateItem) {
      setRole(updateItem);
    } else {
      setRole(initialRoleState);
    }
  }, [updateItem]);

  const handleCloseModal = () => {
    handleClose();
    setRole(initialRoleState);
  };

  const handleAddNews = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (updateItem) {
        await ApiService.putData(
          `/role/${updateItem.id}`,
          role,
          register.access
        );
        toast.success("Successfully updated role!");
      } else {
        await ApiService.postData("/role", role, register.access);
        toast.success("Successfully added role!");
      }
      handleCloseModal();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred!");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (category, type) => (e) => {
    const checked = e.target.checked;
    setRole((prevRole) => ({
      ...prevRole,
      [`${category}_${type}`]: checked,
    }));
  };

  const handleCategoryClick = (category) => {
    const prefix = `${category}_`;
    const allChecked =
      role[`${prefix}views`] && role[`${prefix}edit`] && role[`${prefix}delete`];

    setRole((prevRole) => ({
      ...prevRole,
      [`${prefix}views`]: !allChecked,
      [`${prefix}edit`]: !allChecked,
      [`${prefix}delete`]: !allChecked,
    }));
  };
  const categories = [
    { name: "News", key: "yang" },
    { name: "Request", key: "request" },
    { name: "Sh Rivoj", key: "sh_rivoj" },
    { name: "Price", key: "price" },
    { name: "Vab", key: "vab" },
    { name: "Tasks", key: "tasks" },
    { name: "Tasks Users", key: "tasks_users" },
    { name: "Balls", key: "balls" },
    { name: "H Balls", key: "h_balls" },
    { name: "Item", key: "item" },
    { name: "Auction", key: "auction" },
    { name: "Chat", key: "chat" },
    { name: "Role", key: "role" },
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
console.log(role)
  return (
    <Transition appear show={isOpen}>
      <Dialog
        as="div"
        className="relative z-[998] focus:outline-none"
        onClose={handleCloseModal}
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
              <DialogPanel className="mx-auto w-full max-w-[85%] overflow-hidden rounded-xl bg-white p-6 shadow-xl">
                <div className="mb-5 flex items-center justify-between">
                  <DialogTitle
                    as="h3"
                    className="text-[22px] font-semibold leading-6 text-gray-900"
                  >
                    {updateItem ? "Edit Role" : "Add Role"}
                  </DialogTitle>
                  <button
                    type="button"
                    className="ml-4 text-[22px] leading-[unset]"
                    onClick={handleCloseModal}
                  >
                    <IoClose />
                  </button>
                </div>
                <form onSubmit={handleAddNews}>
                  <div className="mb-4">
                    <label
                      htmlFor="role"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Role
                    </label>
                    <input
                    
                      id="role"
                      name="role"
                      type="text"
                      value={role.role}
                      onChange={(e) =>
                        setRole({ ...role, role: e.target.value })
                      }
                      required
                      className="px-[18px] py-[12px] w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary"
                      />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="search"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Search Categories
                    </label>
                    <input
                      id="search"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="px-[18px] py-[12px] w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary"
                      />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCategories.map(({ name, key }) => (
                      <div key={key} className="category-group">
                        <button
                          className="flex items-center mb-2 cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault()
                            handleCategoryClick(key)
                          }}
                        >
                          <span className="font-semibold">{name}</span>
                        </button>
                        <div className="flex flex-col pl-4">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id={`${key}_views`}
                              checked={role[`${key}_views`]}
                              onChange={handleCheckboxChange(key, "views")}
                            />
                            <label
                              className="ml-2"
                              htmlFor={`${key}_views`}
                            >
                              View
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id={`${key}_edit`}
                              checked={role[`${key}_edit`]}
                              disabled={!role[`${key}_views`]}
                              onChange={handleCheckboxChange(key, "edit")}
                            />
                            <label
                              className="ml-2"
                              htmlFor={`${key}_edit`}
                            >
                              Edit
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id={`${key}_delete`}
                              checked={role[`${key}_delete`]}
                              disabled={!role[`${key}_views`]}
                              onChange={handleCheckboxChange(key, "delete")}
                            />
                            <label
                              className="ml-2"
                              htmlFor={`${key}_delete`}
                            >
                              Delete
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      disabled={loading}
                    >
                      {loading ? <SimpleLoading /> : updateItem ? "Update" : "Add"}
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
