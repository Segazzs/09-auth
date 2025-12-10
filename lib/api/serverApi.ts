import { cookies } from "next/headers";
import { nextServer } from "./api";
import { Note } from "@/types/note";
import { User } from "@/types/user";

interface FetchItem {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  text: string,
  tag?: string,
  page?: number
): Promise<FetchItem> => {
  let url = `/notes?search=${text}&page=${page}&perPage=20&sortBy=created`;

  if (tag && tag !== "all") {
    url += `&tag=${tag}`;
  }

  const cookieStore = await cookies();

  const res = await nextServer.get<FetchItem>(url, {
    headers: { Cookie: cookieStore.toString() },
  });

  return res.data;
};
export const fetchNotesById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};
export const checkSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};
