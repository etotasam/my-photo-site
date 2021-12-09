import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useLoadStateContext, useLoadDispatchContext } from "../../../context/loadStateContext";
import Loading from "@/components/Loading";

type Params = {
  locations: string[];
  error: Error;
};

export const MainModal = ({ locations, error }: Params) => {
  const router = useRouter();
  let photo_label: string;
  if (typeof router.query.photo_label === "string") {
    photo_label = router.query.photo_label;
  }

  const { isLoading } = useLoadStateContext();
  const { startLoadDispatcher, loadedDispatcher } = useLoadDispatchContext();
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, location: string) => {
    e.preventDefault();
    if (photo_label === location) return;
    startLoadDispatcher();
    router.push(`/photo/${location}`);
  };

  // hide <Loading> when close this Modal
  useEffect(() => {
    return () => {
      loadedDispatcher();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className={`t-modal-height bg-white w-full flex justify-center items-center`}
    >
      {error ? (
        <div>
          <p>データ取得に失敗しました 一度更新してください</p>
        </div>
      ) : (
        <div className={`border border-gray-400 px-5 py-7 min-w-[200px]`}>
          <ul>
            {locations &&
              locations.map((location) => (
                <li key={location} className={`text-center pb-2 last-of-type:pb-0`}>
                  <a
                    onClick={(e) => handleClick(e, location)}
                    className={`${photo_label === location ? `text-green-600` : `text-gray-500 cursor-pointer`}`}
                  >
                    {`${location.charAt(0).toUpperCase()}${location.slice(1)}`}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      )}
      {isLoading && <Loading />}
    </motion.div>
  );
};
