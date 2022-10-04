import { HeaderContainer } from "@/components/header/Header";

export default function TestLayout({ children }) {
  return (
    <>
      <HeaderContainer />
      <main className={`t-main`}>{children}</main>
      <footer className={`t-footer-height bg-pink-300`}>テストフッター</footer>
    </>
  );
}
