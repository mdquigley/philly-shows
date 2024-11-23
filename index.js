import puppeteer from "puppeteer";
import { johnnyBrendas } from "./johnnybrendas.js";
import { ortliebs } from "./ortliebs.js";
import { unionTransfer } from "./uniontransfer.js";

const main = async () => {
  johnnyBrendas();
  ortliebs();
  unionTransfer();
};

main();
