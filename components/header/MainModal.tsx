import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useHeadersContext } from "./HeadersContext";

type Params = {
  params: {
    locations: string[];
  };
  error: Error;
};

const MainModal = ({ params, error }: Params) => {
  const router = useRouter();
  const { state, dispatch } = useHeadersContext();

  let photo_label: string;
  if (typeof router.query.photo_label === "string") {
    photo_label = router.query.photo_label;
  }
  function handleClick(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    location: string
  ) {
    e.preventDefault();
    dispatch({ type: state.isModalActive ? `inactive` : `active` });
    router.push(`/photo/${location}`);
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className={`t-modal-height bg-white w-full flex justify-center items-center z-50`}
    >
      {error ? (
        <div>
          <p>データ取得に失敗しました</p>
          <p>一度更新してください</p>
        </div>
      ) : (
        <div className={`border border-gray-400 px-5 py-7 min-w-[200px]`}>
          <ul>
            {params &&
              params.locations.map((location) => (
                <li
                  key={location}
                  className={`text-center pb-2 last-of-type:pb-0 ${
                    photo_label === location
                      ? `text-green-600`
                      : `text-gray-500`
                  }`}
                >
                  <Link href={`/photo/${location}`}>
                    <a onClick={(e) => handleClick(e, location)}>
                      {`${location.charAt(0).toUpperCase()}${location.slice(
                        1
                      )}`}
                    </a>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default MainModal;
