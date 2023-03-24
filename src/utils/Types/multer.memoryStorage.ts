export interface MulterMemoryStorage {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}
export type multerMemoryFiledType = {
  [fieldname: string]: MulterMemoryStorage[];
};
