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
