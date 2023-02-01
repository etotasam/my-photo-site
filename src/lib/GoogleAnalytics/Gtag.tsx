import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";

export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "";

//? IDが取得できない場合を想定する
export const existsGaId = GA_ID !== "";

//? PVを測定する
export const pageview = (path: string) => {
  gtag("config", GA_ID, {
    page_path: path,
    debug_mode: true,
  });
};

//? GAイベントを発火させる
export const event = ({ action, category, label, value = "" }) => {
  if (!existsGaId) return;

  gtag("event", action, {
    event_category: category,
    event_label: label ? JSON.stringify(label) : "",
    value,
  });
};

//? hook ページ遷移した時に発火して、GAがデータを取得できる様にする
export const usePageView = () => {
  const router = useRouter();
  useEffect(() => {
    if (!existsGaId) return;

    const handleRouteChange = (path: string) => {
      //? 対象外にしたいpageを設定
      if (path.match(/\/admin/)) return;
      if (path.match(/\/404/)) return;
      pageview(path);
    };

    handleRouteChange(router.pathname);
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
};

//? _appでコンポーネントとして読み込む
const GoogleAnalytics: React.FC<{}> = () => {
  return (
    <>
      {existsGaId && (
        <>
          <Script
            defer
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga" defer strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
          `}
          </Script>
        </>
      )}
    </>
  );
};

export default GoogleAnalytics;
