export interface IUser {
  displayName: string;
  product: string;
  followers: number;
  id: string;
  url: string;
}

export interface SeedOptions {
  seed_tracks: string[];
  seed_genres: string[];
  seed_artists: string[];
}

export interface Options {
  [popularity: string]: SingleOption;
  acousticness: SingleOption;
  danceability: SingleOption;
  tempo: SingleOption;
  energy: SingleOption;
  instrumentalness: SingleOption;
  liveness: SingleOption;
  loudness: SingleOption;
  speechiness: SingleOption;
  valence: SingleOption;
}

export interface SingleOption {
  name: string;
  target: number;
  min: number;
  max: number;
  isAuto: boolean;
}

export interface TargetOption {
  target: number;
}

export interface MinMaxOptions {
  min: number;
  max: number;
}

export interface TopResult {
  items: ResultItem[];
}

export interface ResultItem {
  genres: string[];
  id: string;
}

export interface RecoResults {
  id: string;
  name: string;
  popularity: number;
  preview_url: string;
  album: {
    artists: ResultArtist[];
    images: ResultImage[];
  };
}

export interface ResultImage {
  height: string;
  url: string;
}

export interface ResultArtist {
  id: string;
  name: string;
  href: string;
}
