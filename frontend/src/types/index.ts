export interface Album {
  id: string;
  name: string;
  title: string;
  artist: string;
  images: { href: string; height: number }[];
}
