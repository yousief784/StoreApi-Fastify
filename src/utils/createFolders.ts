import fs from 'fs';
import path from 'path';

class CheckFoldersExists {
    private pathFromRoot = process.cwd() + '/public';

    createFoldersIfNotExists = () => {
        this.makeFolderIfNotExist('/uploads');
        this.makeFolderIfNotExist('/temp');
        this.makeFolderIfNotExist('/uploads/categoriesPictures');
        this.makeFolderIfNotExist('/uploads/productsPictures');
    };

    private makeFolderIfNotExist = (folderPath: string) => {
        const splitFoldersName = folderPath.split('/');

        splitFoldersName.forEach((folderName: string, idx: number) => {
            const pathCheck = this.pathFromRoot + `${splitFoldersName.slice(0, idx).join('/')}/${folderName}`;
            !fs.existsSync(pathCheck) && fs.mkdirSync(path.join(pathCheck));
        });
    };
}

export default new CheckFoldersExists();
