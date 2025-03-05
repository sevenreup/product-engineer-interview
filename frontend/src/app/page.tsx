import { fetchTopAlbums } from "@/libs/api/itunes";
import Image from "next/image";

export default async function Home() {
  const albums = await fetchTopAlbums();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Mophones Music</h1>
      <div className="flex flex-col gap-4 mb-6">
        {albums.map((album) => (
          <div
            key={album.id}
            className="bg-white rounded-lg shadow-md p-4 flex items-center border"
          >
            <div className="w-20 h-20 mr-4">
              <Image
                src={album.images[2].href}
                alt={album.name}
                height={album.images[2].height}
                width={album.images[2].height}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div className="flex-grow">
              <h2 className="font-semibold text-lg truncate">{album.name}</h2>
              <p className="text-gray-600 truncate">{album.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

