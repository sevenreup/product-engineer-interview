export interface Album {
  "im:name": { label: string };
  "im:artist": { label: string };
  "im:image": Array<{ label: string; attributes: { height: string } }>;
  title: { label: string };
  id: { label: string };
}

export interface ITunesResponse {
  feed: {
    entry: Album[];
  };
}
