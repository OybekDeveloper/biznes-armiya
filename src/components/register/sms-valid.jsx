import { MdInfo } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Loader1 from "../loader/loader1";
import * as Action from "../../reducer/event";
import { useTranslation } from "react-i18next";
const SmsValid = () => {
  const { t } = useTranslation();
  const { registerLoading } = useSelector((state) => state.event);
  const dispatch = useDispatch();

  const { registerCode, regsiterDataError } = useSelector(
    (state) => state.event
  );
  return (
    <>
      {registerLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center flex-col z-10">
          <div className="flex justify-center items-center flex-col gap-4">
            <Loader1 />
          </div>
        </div>
      )}
      <div className="flex bg-background-secondary py-[21px] px-[12px] rounded-[14px] justify-around items-center">
        <MdInfo className="clamp3 text-primary" />
        <h1 className="text-[14px] text-primary font-[500]">
          {t("rstep4_info")}
        </h1>
      </div>
      <div className="">
        <label
          className="text-[14px] font-[700] text-thin"
          htmlFor="register_code"
        >
          {t("rstep4_input1_label")}
        </label>
        <input
          onChange={(e) => dispatch(Action.verifyEmailSlices(e.target.value))}
          id="register_code"
          className="px-[18px] py-[12px] w-full border-[2px] border-solid border-background-secondary rounded-[14px] outline-none focus:border-primary"
          type="text"
          placeholder="123456"
          name="register_code"
          value={registerCode}
        />
        {regsiterDataError?.register_code && (
          <p className="text-red-500">{t("rstep4_input2_error")}</p>
        )}
      </div>
    </>
  );
};

export default SmsValid;
