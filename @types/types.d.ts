export type ImagesType = {
  documentId: string;
  width: number;
  createAt: CreateAt;
  height: number;
  url: string;
  filename: string;
  id: string;
};

type CreateAt = {
  _seconds: number,
  _nanoseconds: number
}