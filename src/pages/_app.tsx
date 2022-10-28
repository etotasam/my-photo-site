import "@/styles/globals.css";
import dynamic from "next/dynamic";
import Default from "@/layouts/Default";
import CSRLayout from "@/layouts/CSRLayout";
import Plain from "@/layouts/Plain";
import Admin from "@/layouts/Admin";
//! middleware
import { AdminMiddleware } from "../../middleware/adminMiddleware";
//! firebase
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth } from "firebase/auth";
//! context
import { ModalStateProvider } from "@/context/modalStateContext";
import { TopImagesLoadStateProvider } from "@/context/topImagesLoadStateContext";
import { HeightProvider } from "@/context/heightStateContext";
import { LocationNamesProvider } from "@/context/locationNamesContext";
import { CurrentImageIndexProvider } from "@/context/currentImageIndexContext";
import { AuthProvider } from "@/context/authContext";
import { ResultOfLoginExecutionProvider } from "@/context/resultOfLoginExecution";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

//? Initialize Firebase
const app = initializeApp(firebaseConfig);

//? initialize firebase authentication
getAuth(app);
//? firestore emulator
// if (process.env.NEXT_PUBLIC_IS_DEV) {
//   const db = getFirestore();
//   connectFirestoreEmulator(db, "localhost", 8080);
// }

function MyApp({ Component, pageProps }) {
  const NoSSR = dynamic(() => import("@/layouts/NoSSR/NoSSR"), {
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
    case "admin": {
      return (
        <AuthProvider>
          <ResultOfLoginExecutionProvider>
            <AdminMiddleware>
              <Admin>
                <Component {...pageProps} />
              </Admin>
            </AdminMiddleware>
          </ResultOfLoginExecutionProvider>
        </AuthProvider>
      );
    }
    default: {
      return (
        <>
          <CurrentImageIndexProvider>
            <LocationNamesProvider>
              <HeightProvider>
                <TopImagesLoadStateProvider>
                  <ModalStateProvider>
                    <Default>
                      <Component {...pageProps} />
                    </Default>
                  </ModalStateProvider>
                </TopImagesLoadStateProvider>
              </HeightProvider>
            </LocationNamesProvider>
          </CurrentImageIndexProvider>
        </>
      );
    }
  }
}

export default MyApp;
