import { fetchNotes } from "@/lib/api/serverApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug = ["all"] } = await params;

  return {
    title: `${slug}`,
    description: `You are viewing notes filtered by: ${slug}.`,
    openGraph: {
      title: `${slug}`,
      description: `You are viewing notes filtered by: ${slug}.`,
      url: `http://localhost:3000/notes/filter/${slug}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `NoteHub filter preview (${slug})`,
        },
      ],
    },
  };
}

export default async function Tag({ params }: Props) {
  const { slug } = await params;
  const category = slug[0] === "all" ? undefined : slug[0];
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", category],
    queryFn: () => fetchNotes("", category, 1),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={category} />
    </HydrationBoundary>
  );
}
