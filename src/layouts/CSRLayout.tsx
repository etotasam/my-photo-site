import { HeaderContainer } from "@/feature/header/Header";

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderContainer />
      <main className={`t-main`}>{children}</main>
      <footer className={`t-footer-height bg-pink-300`}>テストフッター</footer>
    </>
  );
}
