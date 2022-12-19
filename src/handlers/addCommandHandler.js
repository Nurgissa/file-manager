import { stat, writeFile } from 'fs/promises';
import path from 'path';

const hasFile = (path) => stat(path).then(() => true).catch(() => false);

async function create(pathname) {
    if (await hasFile(pathname)) throw Error("FS operation failed");

    try {
        await writeFile(pathname, "");
    } catch (error) {
        throw Error("FS operation failed");
    }
};

export async function addCommandHandler(_, args, basePath) {
    if (!args || args.length < 1) {
        console.log('Invalid input');
        return;
    }

    const fullpath = path.join(basePath, args[0]);
    create(fullpath)
        .catch(err => console.log(err));
}