import dev from "./config.dev";
import test from "./config.test";
import prod from "./config.prod";
let env = dev;
switch (process.env.NODE_ENV) {
  case "development":
    env = dev;
    break;
  case "test":
    env = test;
    break;
  case "production":
    env = prod;
    break;
}

export default env;