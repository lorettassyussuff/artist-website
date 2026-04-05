"use client";

import dynamic from "next/dynamic";

type WritingsReaderProps = {
  pdfUrl: string;
  title: string;
};

const BookReader = dynamic(() => import("@/components/BookReader"), {
  ssr: false,
});

export default function WritingsReader({
  pdfUrl,
  title,
}: WritingsReaderProps) {
  return <BookReader pdfUrl={pdfUrl} title={title} />;
}
