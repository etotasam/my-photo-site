import Header from "@/components/header/Header";

export default function TestLayout({ children }) {
  return (
    <>
      <Header />
      <main className={`t-def-main`}>{children}</main>
      <footer className={`t-def-footer bg-pink-300`}>テストフッター</footer>
    </>
  );
}
