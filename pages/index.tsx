import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";

const Home: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <main className={styles.container}>
      <Header clearSearch={clearSearch} hasResults={hasResults} />
      <h1>Jiffy</h1>
    </main>
  );
};

export default Home;
