import React, { useEffect, useState } from "react";
import { darkLogo, lightLogo, loginbgsvg, whiterightarrow } from "../../images";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Loader1 from "../loader/loader1";
import { ApiService } from "../api.server";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const register = JSON.parse(localStorage.getItem("register"));
  const [showPassword, setShowPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const newError = {};
    Object.keys(formData).forEach((key) => {
      if (!formData["email"]) {
        newError["email"] = `E-mail - maydoni bo'sh bo'lmasligi kerak!`;
      }
      if (!formData["password"]) {
        newError["password"] = `Parol - maydoni bo'sh bo'lmasligi kerak!`;
      }
    });
    if (Object.keys(newError).length > 0) {
      setErrorMessage(newError);
      setLoading(false);
      return;
    }
    setErrorMessage(null);
    const toastId = toast.loading("Tizimga kirilmoqda...");

    const fetchLogin = async () => {
      try {
        const res = await ApiService.postRegisterData("/login", formData);
        setErrorMessage();
        localStorage.setItem("register", JSON.stringify(res));
        navigate("/");
        setLoading(false);

        toast.success("Siz muvoffaqiyatli kirdingiz!", { id: toastId });
      } catch (error) {
        setLoading(false);

        setErrorMessage(error?.response?.data);
        toast.error(
          <h1 className="text-center">
            Kirishda xatolik, iltimos qayta urunib ko'ring!
          </h1>,
          {
            id: toastId,
          }
        );
      }
    };
    fetchLogin();
  };
  const handleChange = (e) => [
    setFormData({ ...formData, [e.target.name]: e.target.value }),
  ];

  useEffect(() => {
    localStorage.setItem("theme", "light");
    if (register) {
      navigate("/");
    }
  }, [register]);

  if (register) {
    return <Loader1 />;
  }
  return (
    <main className="flex max-md:flex-col max-md:justify-center max-md:h-screen max-md:items-center h-full md:h-[calc(100vh-40px)] px-[20px] md:px-[40px] py-[20px] bg-bg_primary">
      <section className="max-md:hidden w-1/2 h-full bg-primary rounded-l-[24px] flex flex-col justify-center items-center gap-[32px]">
        <div className="flex flex-col justify-start items-center">
          <img className="w-20 h-20" src={darkLogo} alt="logo" />
          <h1 className="text-3xl text-white font-bold">Biznes Armiya</h1>
        </div>
        <h1 className="clamp3 font-[700] text-white text-center">
          Sizning ish joyingiz rejasi. Yaratish. Boshqarish.
        </h1>
        <img src={loginbgsvg} alt="" />
      </section>
      <section className="md:hidden flex justify-center items-center">
        <img className="w-20 h-20" src={lightLogo} alt="logo" />
        <h1 className="text-3xl font-[700] text-primary">Biznes Armiya</h1>
      </section>
      <section className="md:rounded-r-[24px] max-md:shadow-custom md:w-1/2 w-full md:h-full md:bg-white max-md:rounded-[24px] max-md:py-[26px]">
        <div className="mx-auto w-11/12 md:w-[80%] lg:w-[60%] h-full flex flex-col justify-center items-center gap-[33px]">
          <h1 className="text-[#0A1629] text-[22px] font-[700]">
            Tizimga kirish
          </h1>
          <form action="" className="w-[300px] flex flex-col gap-[16px]">
            {errorMessage?.non_field_errors && (
              <p className="text-red-500">E-mail yoki parol noto'g'ri!</p>
            )}
            <div>
              <label
                className="text-[14px] font-[700] text-thin"
                htmlFor="email"
              >
                E-mail
              </label>
              <input
                onChange={handleChange}
                className="px-[18px] py-[12px] w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary"
                type="email"
                id="email"
                value={formData?.email}
                name="email"
                placeholder="youremail@gmail.com"
              />
              {errorMessage?.email && (
                <p className="text-red-500">{errorMessage?.email}</p>
              )}
            </div>
            <div>
              <label
                className="text-[14px] font-[700] text-thin"
                htmlFor="password"
              >
                Parol
              </label>
              <div className="w-full relative flex items-center">
                <input
                  onChange={handleChange}
                  className="px-[18px] py-[12px] w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary"
                  type={showPassword ? "password" : "text"}
                  placeholder="*******"
                  id="password"
                  value={formData?.password}
                  name="password"
                />
                {formData?.password !== "" &&
                  (showPassword ? (
                    <button
                      className="absolute right-4"
                      onClick={togglePasswordVisibility}
                    >
                      <FaRegEye />
                    </button>
                  ) : (
                    <button
                      className="absolute right-4"
                      onClick={togglePasswordVisibility}
                    >
                      <FaRegEyeSlash />
                    </button>
                  ))}
              </div>
              {errorMessage?.password && (
                <p className="text-red-500">{errorMessage?.password}</p>
              )}
            </div>
            <button
              onClick={handleSubmit}
              className="px-[40px] py-[12px] rounded-[14px] bg-primary text-[16px] font-[600] text-white flex justify-center gap-2"
            >
              Kirish
              <img src={whiterightarrow} alt="" />
            </button>
          </form>
          <NavLink
            to={"/register"}
            className={"text-primary text-[16px] font-[600]"}
          >
            Sizda hisob mavjud emasmi?
          </NavLink>
        </div>
      </section>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center flex-col">
          <div className="flex justify-center items-center flex-col gap-4">
            <Loader1 />
          </div>
        </div>
      )}
    </main>
  );
};

export default Login;
