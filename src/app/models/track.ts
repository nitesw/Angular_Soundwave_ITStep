export interface ITrack {
  id: number;
  title: string;
  description?: string;
  trackUrl: string;
  imgUrl: string;
  isPublic: boolean;
  isArchived: boolean;
  additionalTags?: string;
  uploadDate: Date;
  artistName?: string;
  genreId: number;
  genreName?: string;
  userId?: string;
}

export interface CreateTrackModel {
  title: string;
  description: string | null;
  track: File;
  image: File;
  isPublic: boolean;
  isArchived: boolean;
  additionalTags?: string;
  artistName?: string;
  genreId: number;
  userId?: string;
}

export interface EditTrackModel {
  id: number;
  title: string;
  description: string | null;
  track: File;
  image: File;
  isPublic: boolean;
  isArchived: boolean;
  additionalTags?: string;
  artistName?: string;
  genreId: number;
  userId?: string;
}
