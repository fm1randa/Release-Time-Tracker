import { SafeResolver } from "../lib/safe-resolver";

const resolver = new SafeResolver();

resolver.define("getText", (req) => {
  console.log(req);
  req.payload.example;
  return "Hello, world!";
});

export const handler = resolver.getDefinitions();
