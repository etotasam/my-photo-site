import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";

type Params = {
  params: {
    locations: string[];
  };
  error: Error;
};

const MenuOnPC = ({ params, error }: Params) => {
  const router = useRouter();
  const label = router.query.photo_label;

  function toLink(el: string, e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault;
    if (el === label) return;
    router.push(`/photo/${el}`);
  }

  return (
    <>
      {error ? (
        <p>データ取得に失敗しました。一度更新してください</p>
      ) : (
        <ul className={`flex`}>
          {location &&
            params &&
            params.locations.map((el: string) => (
              <li key={el} className={`pr-3 text-gray-900 font-thin`}>
                <motion.a
                  onClick={(e) => toLink(el, e)}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className={`inline-block cursor-pointer ${
                    label === el && `text-green-600`
                  }`}
                >
                  {`${el.charAt(0).toUpperCase()}${el.slice(1)}`}
                </motion.a>
              </li>
            ))}
        </ul>
      )}
    </>
  );
};

export default MenuOnPC;
