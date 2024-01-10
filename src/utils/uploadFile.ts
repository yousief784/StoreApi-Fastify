import util from 'node:util';
import { pipeline } from 'node:stream';
import fs from 'fs';
import { FOLDERS_NAME } from './enums';
import sharp from 'sharp';

// this function used to upload all picture to any folder in public/uploads
const uploadPicture = async (file: any, folderName: FOLDERS_NAME): Promise<string> => {
    // upload folder to temp file before crop image
    const picturePath = `public/temp/${new Date().getTime()}.${file.picture.mimetype.split('/').pop()}`;
    const pump = util.promisify(pipeline);
    await pump(file.picture.toBuffer(), fs.createWriteStream(picturePath));

    // transfer image to spacefic folder after crop and return final image path
    const imageAfterCroped = await cropImage(picturePath, folderName);
    return imageAfterCroped;
};

// crop image 3200 * 3200
export const cropImage = async (currentPicturePath: string, folderName: FOLDERS_NAME): Promise<string> => {
    const finalPictureFilePath = `public/uploads/${folderName}/${currentPicturePath.split('/').pop()}`;

    await sharp(currentPicturePath)
        .resize(3200, 3200, {
            fit: sharp.fit.inside,
        })
        .toFile(finalPictureFilePath);

    return finalPictureFilePath.split('/').slice(1).join('/');
};

export default uploadPicture;
