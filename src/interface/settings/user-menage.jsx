import React, { useEffect, useState } from "react";
import { ApiService } from "../../components/api.server";
import Loader1 from "../../components/loader/loader1";
import SimpleLoading from "../../components/loader/simple-loading";
import AddListboxSetting from "./combobox";
import toast from "react-hot-toast";

const UserMenage = () => {
  const register = JSON.parse(localStorage.getItem("register"));

  const [users, setUsers] = useState({
    user: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [selected, setSelected] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);

  const handleChangeData = (e) => {
    const { name, value } = e.target;
    setSelected({ ...selected, [name]: value });
  };

  const handleSaveData = async (e) => {
    e.preventDefault();
    const newError = {};
    Object.keys(selected).forEach((key) => {
      if (!selected[key]) {
        newError[key] = `${key} field is required`;
      }
    });
    if (Object.keys(newError).length > 0) {
      setErrorMessage(newError);
      return;
    } else {
      setErrorMessage({});
    }

    setSaveLoading(true);

    try {
      await ApiService.putData(
        `/update-user/${selected.user}/`,
        {
          role: selected.role,
        },
        register?.access
      );
      toast.success("Successfully updated user!");
      // Optionally, update the user list or other state based on the response
    } catch (error) {
      console.log(error);
      setErrorMessage({ save: "Failed to save data" });
    } finally {
      setSaveLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (register) {
        try {
          const roles = await ApiService.getData("/role", register?.access);
          const users = await ApiService.getData("/users", register?.access);
          setUsers(users);
          setRoles(roles);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loader1 />;
  }

  return (
    <main className="">
      <section className="w-full grid max-sm:grid-cols-1 grid-cols-4 gap-4">
        <div className="w-full flex flex-col gap-3 col-span-2">
          <h1>Selected user</h1>
          <AddListboxSetting
            data={users}
            handleChange={handleChangeData}
            status="user"
          />
          {errorMessage.user && (
            <p className="text-red-500">{errorMessage.user}</p>
          )}
        </div>
        <div className="w-full flex flex-col gap-3 col-span-2">
          <h1>Selected role</h1>
          <AddListboxSetting
            data={roles}
            handleChange={handleChangeData}
            status="role"
          />
          {errorMessage.role && (
            <p className="text-red-500">{errorMessage.role}</p>
          )}
        </div>
      </section>
      <section className="flex justify-end items-center mt-2">
        {errorMessage.save && (
          <p className="text-red-500 ml-4">{errorMessage.save}</p>
        )}
        <button
          onClick={handleSaveData}
          className={`px-4 py-2 bg-button-color text-white rounded-md shadow-btn_shadow`}
          disabled={saveLoading}
        >
          {saveLoading ? (
            <div className="flex justify-end items-center gap-2">
              <SimpleLoading />
              <p>Loading...</p>
            </div>
          ) : (
            "Save"
          )}
        </button>
      </section>
    </main>
  );
};

export default UserMenage;
