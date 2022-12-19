import { stat, rename as renameFile } from 'fs/promises';
import path from 'path';

const hasFile = (path) => stat(path).then(() => true).catch(() => false);

const rename = async (source, target) => {
    const hasSource = await hasFile(source);
    const hasTarget = await hasFile(target);

    if (!hasSource || hasTarget) throw Error("FS operation failed");

    try {
        await renameFile(source, target);
    } catch (err) {
        throw Error("FS operation failed");
    }
};

export async function mvCommandHandler(_, args, basePath) {
    if (!args || args.length < 2) {
        console.log('Invalid input');
        return;
    }

    const [source, target] = args;
    const sourcePath = path.join(basePath, source);
    const targetPath = path.join(basePath, target);
    rename(sourcePath, targetPath)
        .catch(err => console.log(err));
}