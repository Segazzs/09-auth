"use client";

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuth = useAuthStore((state) => state.clearIsAuth);

  useEffect(() => {
    const fetchUser = async () => {
      const isAuth = await checkSession();

      if (isAuth) {
        const user = await getMe();
        if (user) setUser(user);
      } else {
        clearIsAuth();
      }
    };

    fetchUser();
  }, [setUser, clearIsAuth]);

  return children;
};

export default AuthProvider;
