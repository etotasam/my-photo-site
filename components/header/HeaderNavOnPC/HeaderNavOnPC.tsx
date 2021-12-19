import React from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

type Params = {
  locations: string[];
  error?: Error;
};

export const HeaderNavOnPC = ({ locations, error }: Params) => {
  const router = useRouter();
  const label = router.query.photo_label;

  const toLink = (location: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault;
    if (location === label) return;
    router.push(`/photo/${location}?image=1`);
  };

  return (
    <>
      {error ? (
        <p>データ取得に失敗しました。一度更新してください</p>
      ) : (
        <ul data-testid={`pc`} className={`flex`}>
          {locations &&
            locations.map((location: string) => (
              <li key={location} className={`pr-3 text-gray-900 font-thin`}>
                <motion.a
                  onClick={(e) => toLink(location, e)}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className={`inline-block cursor-pointer ${label === location && `text-green-600`}`}
                >
                  {`${location.charAt(0).toUpperCase()}${location.slice(1)}`}
                </motion.a>
              </li>
            ))}
        </ul>
      )}
    </>
  );
};
