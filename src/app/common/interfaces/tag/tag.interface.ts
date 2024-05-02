export interface ITag {
  id: number;
  name: string;
  description: string;
}

export interface ITreeTagElement extends ITag {
  childTags: ITreeTagElement[];
  ratingScope: number;
}
export interface ICreateTag{
  name: string;
  description: string;
  baseTagId?: number;
}

export interface ITreeTag {
  ratingName: string;
  hourlyUpdate: number;
  scoringType: string;
  tag: ITreeTagElement[];
}

export interface tagScore {
  [key: number]: number;
}

export interface TagEvent {
  id: number;
  score: number;
}

export interface ITreeTagShowElement {
  id: number;
  name: string;
  score: number;
  childs?: ITreeTagShowElement[];
}
