"use client";

import { fetchTopAlbums } from "@/libs/api/itunes";
import { Album } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data, isLoading, isError } = useQuery<{ feed: { entry: Album[] } }>({
    queryKey: ["topAlbums"],
    queryFn: fetchTopAlbums,
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading top albums...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">Error loading albums</div>
    );
  }

  const albums = data?.feed.entry || [];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {albums.map((album, index) => (
        <div key={index}>{album["im:name"].label}</div>
      ))}
    </div>
  );
}

