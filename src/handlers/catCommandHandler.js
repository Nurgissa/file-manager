import { stat, readFile } from 'fs/promises';
import path from 'path';

const hasFile = (path) => stat(path).then(() => true).catch(() => false);

async function read(pathname) {
    if (!await hasFile(pathname)) throw Error("FS operation failed");

    try {
        const content = await readFile(pathname, { encoding: "utf-8" });
        return content;
    } catch (err) {
        throw Error("FS operation failed");
    }
};

export async function catCommandHandler(_, args, basePath) {
    if (!args || args.length < 1) {
        console.log('Invalid input');
        return;
    }

    const fullpath = path.join(basePath, args[0]);
    read(fullpath)
        .then(console.log)
        .catch(err => console.log(err.message));
}