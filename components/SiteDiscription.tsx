import React from "react";

const SiteDiscription = () => {
  return (
    <>
      <div
        className={`md:t-text-vertical font-serif px-2 pt-5 font-thin text-gray-500`}
      >
        <h1 className={`text-xl font-bold mb-5 md:mb-0 md:ml-5`}>
          良く写真を撮っていた
        </h1>
        <p className={`t-font-clamp-sm leading-7 md:leading-9 tracking-widest`}>
          ただ写真を掲載しているwebサイトです <br />
          写真が好きで血迷って4×5カメラを買った事もあります <br />
          良く旅行に行ったのでその時の写真が多いです <br />
          写真を眺めてると撮りたくなります <br />
          自分の写真を眺めてると特に撮りたくなります <br />
          だから作ったwebサイトです
        </p>
      </div>
    </>
  );
};

export default SiteDiscription;
