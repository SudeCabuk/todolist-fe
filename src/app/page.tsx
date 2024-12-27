"use client"
import { useEffect } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(()=> {
    if(localStorage.getItem("user")){
      router.push("/home")
    }else{
      router.push("/login")
    }
  },[])
  return (
    <div className={styles.page}>
  
    </div>
  );
}
