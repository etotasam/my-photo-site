import "@/styles/globals.css";
import dynamic from "next/dynamic";
import Default from "@/layouts/Default";
import CSRLayout from "../layouts/CSRLayout";
import Plain from "@/layouts/Plain";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);

function MyApp({ Component, pageProps }) {
  const NoSSR = dynamic(() => import("@/components/NoSSR"), {
    ssr: false,
  });
  switch (pageProps.layout) {
    case "csr": {
      return (
        <NoSSR>
          <CSRLayout>
            <Component {...pageProps} />
          </CSRLayout>
        </NoSSR>
      );
    }
    case "plain": {
      return (
        <Plain>
          <Component {...pageProps} />
        </Plain>
      );
    }
    default: {
      return (
        <>
          <Default>
            <Component {...pageProps} />
          </Default>
        </>
      );
    }
  }
}

export default MyApp;
