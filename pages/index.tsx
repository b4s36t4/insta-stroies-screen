import { Loading } from "@nextui-org/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter(); // Router hook from Next.js

  useEffect(() => {
    if (router.isReady) {
      // Let router be available fully to client
      router.replace("/onboarding"); // Redirect to the onboarding screen from main page.
    }
  }, [router]);
  return <Loading />; //Show loading till redirection being done.
};

export default Home;
