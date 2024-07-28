import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { ApiService } from "../../components/api.server";
import DeleteModal from "./delete-role";
import AddRoleModal from "./add-role-modal";
import Loader1 from "../../components/loader/loader1";
const AddRole = () => {
  const register = JSON.parse(localStorage.getItem("register"));
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [delRole, setDelRole] = useState(false);
  const [delId, setDelId] = useState(null);
  const [addRole, setAddRole] = useState(false);
  const [updateRole, setUpdateRole] = useState();

  const handleAddRole = () => {
    setAddRole(!addRole);
  };

  const handleDeleteRole = (id) => {
    setDelRole(!delRole);
    setDelId(id);
  };

  const handleEditRole = (item) => {
    setUpdateRole(item);
    handleAddRole()
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ApiService.getData("/role", register?.access);
        console.log(res);
        setRoles(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [delRole, delId, addRole]);
  return (
    <>
      {loading ? (
        <Loader1 />
      ) : (
        <main>
          <div className="flex justify-between items-center gap-3">
            <h1>Roles</h1>
            {true && (
              <>
                <button
                  onClick={handleAddRole}
                  className="max-md:hidden bg-button-color flex justify-start items-center gap-2 rounded-[14px] px-3 py-2 text-white shadow-btn_shadow"
                >
                  <FaPlus />
                  <h1>Add Role</h1>
                </button>
                <button
                  onClick={handleAddRole}
                  className="md:hidden fixed bottom-[16px] right-[16px] bg-button-color flex justify-start items-center gap-2 rounded-full p-4 text-white shadow-btn_shadow"
                >
                  <FaPlus />
                </button>
              </>
            )}
          </div>
          <div>
            <table className="min-w-full bg-card rounded-xl shadow-sm">
              <thead className="border-b border-hr-color">
                <tr>
                  <th className="clamp4 px-4 py-2 text-start">Id</th>
                  <th className="clamp4 px-4 py-2 text-start">Role</th>
                  <th className="clamp4 px-4 py-2 text-start"></th>
                </tr>
              </thead>
              <tbody>
                {roles
                  ?.slice()
                  ?.reverse()
                  ?.map((item, idx) => (
                    <motion.tr
                      key={item?.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-card hover:bg-hover-card cursor-pointer border-b border-hr-color"
                    >
                      <td className="clamp4 px-4 py-2 font-bold">{item?.id}</td>
                      <td className="clamp4 px-4 py-2">
                        <div className="flex items-center">
                          {item?.role?.length > 15
                            ? item?.role.slice(0, 15) + "..."
                            : item?.role}
                        </div>
                      </td>
                      <td className="h-full clamp4 px-4 py-2 flex justify-end items-center gap-3">
                        <FaRegTrashAlt
                          onClick={() => handleDeleteRole(item?.id)}
                          className="size-4 fill-thin "
                        />
                        <MdModeEdit
                          onClick={() => handleEditRole(item)}
                          className="size-4 fill-thin"
                        />
                      </td>
                    </motion.tr>
                  ))}
              </tbody>
            </table>
          </div>
          <DeleteModal
            isOpen={delRole}
            handleClose={handleDeleteRole}
            id={delId}
          />
          <AddRoleModal
            isOpen={addRole}
            handleClose={handleEditRole}
            updateItem={updateRole}
          />
        </main>
      )}
    </>
  );
};

export default AddRole;
