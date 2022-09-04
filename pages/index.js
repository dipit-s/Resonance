import Head from "next/head";
import Image from "next/image";
import LandingPage from "../components/landingPage";
import Whatsnew from "../components/whatsnew";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <LandingPage />
      <Whatsnew />
    </div>
  );
}
