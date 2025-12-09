import { Metadata } from "next";
import css from "./Home.module.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Page not found",
  description: "This page not found",
  metadataBase: new URL("https://notehub.com"),
  openGraph: {
    title: "404 — Page not found",
    description: "This page not found",
    url: "/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Page not found",
      },
    ],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">Go back home</Link>
    </>
  );
}
