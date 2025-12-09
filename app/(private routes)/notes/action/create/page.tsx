import NoteForm from "@/components/NoteForm/NoteForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Note",
  description: "Page for creating a new note",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Create New Note",
    description: "Page for creating a new note.",
    url: "https://example.com/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create new note",
      },
    ],
  },
};

const CreateNote = async () => {
  return (
    <main>
      <div>
        <h1>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNote;
