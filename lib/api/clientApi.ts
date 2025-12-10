import { nextServer } from "./api";
import { User } from "@/types/user";
import type { Note, FormValues } from "../../types/note";

interface FetchItem {
  notes: Note[];
  totalPages: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

type CheckSessionRequest = {
  success: boolean;
};

export interface UpdateUserRequest {
  username: string;
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

  const res = await nextServer.get<FetchItem>(url);

  return res.data;
};
export const fetchNotesById = async (id: string): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
};
export const createNote = async (data: FormValues) => {
  const res = await nextServer.post<Note>("/notes", data);
  return res.data;
};
export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await nextServer.delete<Note>(`notes/${id}`);
  return data;
};

export const register = async (body: RegisterRequest) => {
  const { data } = await nextServer.post<User>("/auth/register", body);

  return data;
};

export const login = async (body: RegisterRequest) => {
  const { data } = await nextServer.post<User>("/auth/login", body);

  return data;
};
export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");

  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");

  return data;
};
export const updateMe = async (userName: UpdateUserRequest) => {
  const res = await nextServer.patch<User>("/users/me", userName);
  return res.data;
};
