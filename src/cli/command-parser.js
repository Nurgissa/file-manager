import { osCommandHandler } from "../commands/os/osCommandHandler.js";

function noops(...args) {
    console.log(args);
}

const commandMap = {
    'up': noops,
    'cd': noops,
    'ls': noops,
    'cat': noops,
    'add': noops,
    'rn': noops,
    'cp': noops,
    'mv': noops,
    'rm': noops,
    'os': osCommandHandler,
    'hash': noops,
    'compress': noops,
    'decompress': noops,
    '.exit': (username) => {
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    },
}

function invalidCommandHandler() {
    console.log('Invalid input');
}



export function commandHandler(username) {
    return function(commandParams) {
        const { command, commandArgs } = commandParams;
        const handler = commandMap[command] || invalidCommandHandler;
        handler(username, commandArgs);
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