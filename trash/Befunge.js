/**
 * Created by BANO.notIT on 09.03.17.
 */
import Inter from "../src/modules/Interpreter/Interpreter";

let a = new Inter({
  source: `88*,`,

  size: [25, 1],
  stdout: console.log.bind(console)
});

// a.on("output", console.log);

console.log(a.step(), a._pos, a.stack);
console.log(a.step(), a._pos, a.stack);
console.log(a.step(), a._pos, a.stack);
console.log(a.step(), a._pos, a.stack);
