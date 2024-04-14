export interface ITag {
  id: number;
  name: string;
  description: string;
}
export interface ITreeTagElement extends ITag {
  childTags: ITreeTagElement[];
  ratingScope: tagScope[];
}

interface tagScope {
  ratingScore: number;
}

export interface tagScore {
  [key: number]: number;
}
export interface TagEvent {
  id: number;
  score: number;
}
