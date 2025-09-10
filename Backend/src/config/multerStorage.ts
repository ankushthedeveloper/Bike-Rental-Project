import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary';

export const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async () => ({
    folder: 'bikes',
    allowed_formats: ['jpg', 'jpeg', 'png', 'avif', 'webp'],
  }),
});
