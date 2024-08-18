import styles from "./page.module.css";
import { getServerSession } from "next-auth";
import { authConfig } from "@/config/auth.config";

export default async function Home() {
  const res = await getServerSession(authConfig);

  return <main className={styles.main}>Hello</main>;
}
