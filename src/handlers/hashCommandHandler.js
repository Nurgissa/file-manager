import { stat, readFile } from 'fs/promises';
import path from 'path';
const {
    createHash
} = await import('crypto');

const hasFile = (path) => stat(path).then(() => true).catch(() => false);

const calculateHash = async (filepath) => {
    const hash = createHash('sha256');
    
    try {
        const content = await readFile(filepath, { encoding: "utf-8" });
        hash.update(content);
    } catch (err) {
        console.error(err.message);
    }
    console.log(hash.copy().digest('hex'));
};

export async function hashCommandHandler(_, args, basePath) {
    if (!args || args.length < 1) {
        console.log('Invalid input');
        return;
    }

    const [source] = args;
    const sourcePath = path.join(basePath, source);
    calculateHash(sourcePath)
        .catch(err => console.log(err));
}