import { Album } from "@/types";
import axios from "axios";

interface AlbumData {
  "im:name": { label: string };
  "im:artist": { label: string };
  "im:image": { label: string; attributes: { height: string } }[];
  title: { label: string };
  id: { label: string; attributes: { "im:id": string } };
}

interface ITunesResponse {
  feed: {
    entry: AlbumData[];
  };
}

export const fetchTopAlbums = async (): Promise<Album[]> => {
  try {
    const { data } = await axios.get<ITunesResponse>(
      "https://itunes.apple.com/us/rss/topalbums/limit=100/json"
    );

    return data.feed.entry.map((entry) => {
      const images = entry["im:image"].map((image) => ({
        href: image.label,
        height: parseInt(image.attributes.height),
      }));
      return {
        id: entry.id.attributes["im:id"],
        name: entry["im:name"].label,
        title: entry.title.label,
        artist: entry["im:artist"].label,
        images: images,
      };
    });
  } catch (error) {
    console.error("Error fetching top albums:", error);
    return [];
  }
};
