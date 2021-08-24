export interface INote {
  id?: number;
  title: string;
  body: string;
}

export interface INoteProps {
  note: Required<INote>;
}
