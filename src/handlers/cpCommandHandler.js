import fs from 'fs';
import { stat } from 'fs/promises';
import path from 'path';

const hasFile = (path) => stat(path).then(() => true).catch(() => false);

const copy = async (source, target) => {
    const hasSource = await hasFile(source);
    const hasTarget = await hasFile(target);

    if (!hasSource || hasTarget) throw Error("FS operation failed");

    const rs = fs.createReadStream(source);
    const writeStream = fs.createWriteStream(target);
    
    try {
        rs.pipe(writeStream);
    } catch (err) {
        throw Error("FS operation failed");
    }
};

export async function cpCommandHandler(_, args, basePath) {
    if (!args || args.length < 2) {
        console.log('Invalid input');
        return;
    }

    const [source, target] = args;
    const sourcePath = path.join(basePath, source);
    const targetPath = path.join(basePath, target);
    copy(sourcePath, targetPath)
        .catch(err => console.log(err));
}