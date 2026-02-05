import 'express';

import { Multer } from 'multer';

declare module 'express-serve-static-core' {
  interface Request {
    file?: Express.Multer.File;
    files?: Express.Multer.File[];
  }
}



declare global {
  namespace Express {
    interface Request {
      file?: Multer.File; // single file
      files?: Multer.File[] | { [fieldname: string]: Multer.File[] }; // multiple files
    }
  }
}

