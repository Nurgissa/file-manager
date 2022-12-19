import { createInterface } from 'readline';
import { stdin, stdout } from 'process';

const rl = createInterface({
  input: stdin,
  output: stdout,
  terminal: false
});

rl.on('line', (line) => {
    console.log(line);
});

rl.once('close', () => {
     // end of input
     console.log("ending interaction");
 });