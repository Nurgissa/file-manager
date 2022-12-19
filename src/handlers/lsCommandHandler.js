import { stat, readdir } from 'fs/promises';

const hasFile = (path) => stat(path).then(() => true).catch(() => false);

function prettyPrint(dirs, files) {
    console.log(`+ (idx) |    Type   |\tName`);
    console.log(`+-------+-----------+-----------------+`);
    let count = 0;
    dirs.forEach((dir) => {
        console.log(`| ${count++}\t| directory |\t${dir}`);
    });
    files.forEach((file) => {
        console.log(`| ${count++}\t|    fil    |\t${file}`);
    });
    console.log(`+-------+-----------+-----------------+`);
}

const list = async (pathname) => {
    if (!await hasFile(pathname)) throw Error("FS operation failed");

    try {
        const dirEntries = await readdir(pathname, { withFileTypes: true });
        const folderList = dirEntries.filter(de => de.isDirectory()).map(de => de.name).sort();
        const fileList = dirEntries.filter(de => !de.isDirectory()).map(de => de.name).sort();
        prettyPrint(folderList, fileList);
    } catch (err) {
        throw Error("FS operation failed");
    }
};

export async function lsCommandHandler(_, __, basePath) {
    list(basePath)
        .catch(err => console.log(err.message));
}