import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
//! hooks
import { useDeviceCheck } from "@/hooks";
//! component
import { Header } from "./Header";
//! context
import { useLocationNamesStateContext } from "@/context/locationNamesContext";
import { useModalStateContext, useModalDispatchContext } from "@/context/modalStateContext";
import { useHeihgtDispatchContext } from "@/context/heightStateContext";

export const HeaderContainer = () => {
  //! NavOnPC logic
  const router = useRouter();
  const imagesLocationNamesOnRouterQuery = router.query.photo_label;

  const { locationNames } = useLocationNamesStateContext();

  const toLink = (locationName: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault;
    if (locationName === imagesLocationNamesOnRouterQuery) return;
    router.push(`/photo/${locationName}?image=1`);
  };

  //! NavOnSP logic
  const { isModalActive } = useModalStateContext();
  const { modalOpenDispathcer, modalCloseDispatcher } = useModalDispatchContext();
  //? modalの開閉
  const toggleModal = () => {
    if (isModalActive) return modalCloseDispatcher();
    modalOpenDispathcer();
  };

  //! header logic
  const { device } = useDeviceCheck();

  //? deviceがPCの時はmodalを閉じる
  useEffect(() => {
    if (device === "PC") return modalCloseDispatcher();
  }, [device]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    modalCloseDispatcher();
    if (router.pathname === "/") return;
    router.push(`/`);
    return;
  };

  const { setHeaderHeightDispatcher } = useHeihgtDispatchContext();
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!headerRef.current) return;
    const headerHeight: number = headerRef.current.clientHeight;
    setHeaderHeightDispatcher(headerHeight);
  }, [headerRef.current]);

  return (
    <Header
      locationNames={locationNames}
      device={device}
      imagesLocationNamesOnRouterQuery={imagesLocationNamesOnRouterQuery}
      toLink={toLink}
      isModalActive={isModalActive}
      toggleModal={toggleModal}
      handleClick={handleClick}
      headerRef={headerRef}
    />
  );
};
