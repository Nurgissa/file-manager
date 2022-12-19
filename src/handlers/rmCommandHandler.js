import { stat, rm } from 'fs/promises';
import path from 'path';

const hasFile = (path) => stat(path).then(() => true).catch(() => false);

const remove = async (pathname) => {
    if (!await hasFile(pathname)) throw Error("FS operation failed");

    try {
        await rm(pathname);
    } catch (err) {
        throw Error("FS operation failed");
    }
};

export async function rmCommandHandler(_, args, basePath) {
    if (!args || args.length < 1) {
        console.log('Invalid input');
        return;
    }

    const fullpath = path.join(basePath, args[0]);
    remove(fullpath)
        .catch(err => console.log(err));
}