"use client";

import { useEffect, useState } from "react";
import css from "./EditProfilePage.module.css";
import Image from "next/image";
import { getMe, updateMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

export default function EditProfile() {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    getMe().then((user) => {
      setEmail(user.email ?? "");
      setUserName(user.username ?? "");
      setAvatar(user.avatar ?? "");
    });
  }, []);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveName = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await updateMe({ username: userName });
    if (res) {
      setUser(res);
      router.push("/profile");
    }
  };

  console.log(userName);
  return (
    <>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <h1 className={css.formTitle}>Edit Profile</h1>

          <Image
            src={
              avatar ||
              "https://ac.goit.global/fullstack/react/default-avatar.jpg"
            }
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />

          <form className={css.profileInfo} onSubmit={handleSaveName}>
            <div className={css.usernameWrapper}>
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                type="text"
                className={css.input}
                value={userName}
                onChange={handleChangeName}
              />
            </div>

            <p>Email: {email}</p>

            <div className={css.actions}>
              <button type="submit" className={css.saveButton}>
                Save
              </button>
              <button
                type="button"
                className={css.cancelButton}
                onClick={router.back}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
