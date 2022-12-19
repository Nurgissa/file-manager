import { homedir } from 'os';
import { osCommandHandler } from "../handlers/osCommandHandler.js";
import { catCommandHandler } from "../handlers/catCommandHandler.js";
import { rmCommandHandler } from '../handlers/rmCommandHandler.js';
import { lsCommandHandler } from '../handlers/lsCommandHandler.js';

function noops(...args) {
    console.log(args);
}

const commandMap = {
    'up': noops,
    'cd': noops,
    'ls': lsCommandHandler,
    'cat': catCommandHandler,
    'add': noops,
    'rn': noops,
    'cp': noops,
    'mv': noops,
    'rm': rmCommandHandler,
    'os': osCommandHandler,
    'hash': noops,
    'compress': noops,
    'decompress': noops,
    '.exit': (username) => {
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
        process.exit(0);
    },
}

let currentDir = homedir();

function invalidCommandHandler() {
    console.log('Invalid input');
}

export function commandHandler(username) {
    return function(commandParams) {
        const { command, commandArgs } = commandParams;
        const handler = commandMap[command] || invalidCommandHandler;
        handler(username, commandArgs, currentDir);
    }
}

export function parseCommand(line = "") {
    if (!line) {
        return {};
    }

    const [command, ...rest] = line.trim().split(/\s+/);
    
    return {
        command,
        commandArgs: rest
    }
}