import { FormEvent, useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { auth } from "@/config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { PiGearBold } from "react-icons/pi";
import { setConfig, getConfig, setConfigAll } from "@/config/config_db";

const EditConfig = () => {
  const [configs, setConfigs] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [userAuth] = useAuthState(auth);
  useEffect(() => {
    getConfig()
      .then((config: any) => {
        setConfigs(config);
      })
      .catch((err) => {
        console.error(err);

        toast.error("Aww Snap!");
      });
  }, []);
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (userAuth) {
      try {
        await setConfigAll(configs);
        toast.success("Config Updated");
      } catch (err) {
        console.error(err);

        toast.error("Aww Snap!");
      }
    }
    setLoading(false);
  };
  console.log(configs);
  return (
    <div className="container mb-4 flex w-full rounded-xl bg-white pb-8 pt-3 sm:mt-8 sm:py-0">
      <form
        className="grid w-full grid-cols-1 gap-5 p-5 sm:p-12"
        onSubmit={submitHandler}
      >
        <div className="flex justify-between">
          <div className="flex flex-col gap-5">
            <PiGearBold className="h-12 w-12 text-primary" />
            <h1 className="text-4xl">
              <span className="text-primary">EDIT</span> CONFIG
            </h1>
          </div>
        </div>
        <p>Click on Edit to edit your information.</p>
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            {configs &&
              Array.from(Object.entries(configs)).map((arr, index) => {
                return (
                  <div className="flex items-center gap-2" key={index}>
                    <input
                      className="h-4 w-4 cursor-pointer accent-primary"
                      name={arr[0]}
                      type="checkbox"
                      checked={Boolean(configs[arr[0]])}
                      key={index}
                      onChange={(e) => {
                        setConfigs((s: any) => {
                          return { ...s, [arr[0]]: e.target.checked };
                        });
                      }}
                    />
                    <label htmlFor={arr[0]}>
                      {" "}
                      {arr[0].replaceAll("_", " ")}:{" "}
                      <span
                        className={`${
                          !configs[arr[0]] ? "text-red-500" : "text-primary"
                        } font-bold`}
                      >
                        {String(configs[arr[0]])}
                      </span>
                    </label>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="w-full justify-self-end py-3 md:w-auto md:py-0">
          <button
            style={{
              pointerEvents: loading ? "none" : "auto",
            }}
            className="w-full rounded-xl bg-primary px-8 py-2 text-lg text-white transition-all hover:bg-secondary_light hover:text-primary"
            type="submit"
          >
            {loading ? (
              <CgSpinner className="h-7 w-7 animate-spin text-white" />
            ) : (
              "Update Config"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditConfig;
