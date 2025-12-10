import { fetchNotesById } from "@/lib/api/serverApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetails from "./NoteDetails.client";
import { Metadata } from "next";

interface Prop {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Prop): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNotesById(id);

  return {
    title: `${note.title}`,
    description: `${note.content}`,
    openGraph: {
      title: note.title,
      description: `${note.content}`,
      url: `http://localhost:3000/notes/filter/${id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Note preview: (${note.title})`,
        },
      ],
    },
  };
}

export default async function Note({ params }: Prop) {
  const { id } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNotesById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails />
    </HydrationBoundary>
  );
}
