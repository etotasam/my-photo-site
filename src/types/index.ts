export type ImagesType = {
  documentId: string;
  width: number;
  createAt: CreateAtType | Date;
  height: number;
  url: StaticImageData | string;
  filename: string;
  id: string;
};

export type CreateAtType = {
  _seconds: number,
  _nanoseconds: number
}