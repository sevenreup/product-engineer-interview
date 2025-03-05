import { ITunesResponse } from "@/types";
import axios from "axios";

export const fetchTopAlbums = async (): Promise<ITunesResponse> => {
  try {
    const response = await axios.get(
      "https://itunes.apple.com/us/rss/topalbums/limit=100/json"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching top albums:", error);
    return { feed: { entry: [] } };
  }
};
