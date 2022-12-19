import { createInterface } from 'readline';
import { stdin, stdout } from 'process';
import { extractUsername } from './cli/arguments.js';
import { commandHandler, parseCommand } from './cli/command-parser.js';

function promptGreeting(username) {
    console.log(`Welcome to the File Manager, ${username}!\n`);
}

(function main() {
    const username = extractUsername(process.argv);
    promptGreeting(username);

    const rl = createInterface({
        input: stdin,
        output: stdout,
        terminal: false
      });
      
      rl.on('line', (line) => {
        const commandParams = parseCommand(line);
        commandHandler(username)(commandParams);      
      });
      
      rl.once('close', () => {
           // end of input
           console.log("ending interaction");
      });      
})()


