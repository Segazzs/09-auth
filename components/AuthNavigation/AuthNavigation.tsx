"use client";

import css from "./AuthNavigation.module.css";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api/clientApi";

export default function AuthNavigation() {
  const { isAuth, user } = useAuthStore();
  const router = useRouter();
  const clearIsAuth = useAuthStore((state) => state.clearIsAuth);

  const handleLogout = async () => {
    await logout();
    clearIsAuth();
    router.push("/sign-in");
  };

  return isAuth ? (
    <li className={css.navigationItem}>
      <a href="/profile" className={css.navigationLink}>
        Profile
      </a>
      <button className={css.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </li>
  ) : (
    <>
      <li className={css.navigationItem}>
        <a href="/sign-in" className={css.navigationLink}>
          Login
        </a>
      </li>
      <li className={css.navigationItem}>
        <a href="/sign-up" className={css.navigationLink}>
          Sign up
        </a>
      </li>
    </>
  );
}
