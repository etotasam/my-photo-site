import React from "react";
import { useRouter } from "next/router";

const NotFound = () => {
  const router = useRouter();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`/`);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <div>
      <h1>存在しないページです</h1>
      <p>Homeへ移動します</p>
    </div>
  );
};

export default NotFound;
