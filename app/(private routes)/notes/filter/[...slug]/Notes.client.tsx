"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import NoteList from "@/components/NoteList/NoteList";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useEffect } from "react";
import Pagination from "@/components/Pagination/Pagination";
import css from "./Slug.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import Link from "next/link";

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [text, setText] = useState("");

  const [debouncedText] = useDebounce(text, 300);

  useEffect(() => {
    setPage(1);
  }, [debouncedText]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", page, debouncedText, tag],
    queryFn: () => fetchNotes(debouncedText, tag, page),
  });

  return (
    <>
      <div className={css.app}>
        <div className={css.interface}>
          <SearchBox onChange={handleChange} value={text} />

          {isSuccess && (
            <Pagination
              totalPages={data.totalPages}
              currentPage={page}
              onPageChange={setPage}
            />
          )}
          <Link href="/notes/action/create" className={css.button}>
            Create note +
          </Link>
        </div>
        <div className={css.notesList}>
          <div className={css.notesList}>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error...</p>}
            {isSuccess && <NoteList notes={data.notes} />}
          </div>
        </div>
      </div>
    </>
  );
}
