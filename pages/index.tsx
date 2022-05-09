import { Loading } from "@nextui-org/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      router.replace("/onboarding");
    }
  }, [router]);
  return <Loading />;
};

export default Home;
