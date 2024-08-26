#! /usr/bin/env node

import inquirer from "inquirer";
import numtoword from "./numtoword.js";
import CountPremutation from "./permutation.js";
import chalk from "chalk";

async function TakeUserInput<T>(
  name1: string,
  type1: "list" | "input" | "number",
  question1: string,
  choices1?: string[]
): Promise<T> {
  const ans = await inquirer.prompt({
    name: name1,
    type: type1,
    message: chalk.green(question1),
    choices: choices1, // Used only if type1 is 'list'
  });

  return ans;
}

let History: { Number: number; word: string }[] = [];
let wordHistory: { Word: string; Permutations: number }[] = [];

class CLI {
  constructor() {
    this.main();
  }

  async numToWords() {
    while (true) {
      console.log(chalk.green("Number to Word Converter"));
      console.log("\t");
      console.log(chalk.yellowBright.underline("Instructions:"));
      console.log(
        chalk.yellow(
          `Enter a number between 0 and 1,000,000,000,000 (1 Trillion) \nand it will convert that number into words`
        )
      );
      console.log("\t");

      const input = await inquirer.prompt([
        {
          type: "input",
          name: "input",
          message: "Enter a number:",
          validate: (input: string) => {
            const num = parseInt(input, 10);
            if (isNaN(num) || num < 0 || num > 1000000000000) {
              return "Please enter a valid number between 0 and 1,000,000,000,000";
            }
            return true;
          },
        },
      ]);

      const num = parseInt(input.input, 10);
      History.push({ Number: num, word: numtoword(num) });
      console.table(History);

      const { continueInput } = await inquirer.prompt({
        name: "continueInput",
        type: "confirm",
        message: "Do you want to continue?",
        default: true,
      });

      if (!continueInput) {
        break;
      }

      // Clear console for a cleaner look
      console.clear();
    }
  }

  async permutations() {
    while (true) {
      console.log(chalk.green("Premutation Checker"));
      console.log("\t");
      console.log(chalk.yellowBright.underline("Instructions:"));
      console.log(
        chalk.yellow(
          `A permutation function generates all possible arrangements of a set of items. It is used to determine how many ways you can order a specific word .. check this by entering any word  below:.`
        )
      );
      console.log("\t");

      const input = await inquirer.prompt([
        {
          type: "input",
          name: "input",
          message: "Enter any word:",
          validate: (input: string) => {
            // Check if the input is empty
            if (!input.trim()) {
              return "Input cannot be empty. Please enter a valid word.";
            }
            // Additional checks can be added here if needed
            return true;
          },
        },
      ]);

      const word = input.input;
      wordHistory.push({ Word: word, Permutations: CountPremutation(word) });
      console.table(wordHistory);

      const { continueInput } = await inquirer.prompt({
        name: "continueInput",
        type: "confirm",
        message: "Do you want to continue?",
        default: true,
      });

      if (!continueInput) {
        break;
      }

      // Clear console for a cleaner look
      console.clear();
    }
  }

  async exitProgram() {
    console.log("Exiting...");
    console.log("\t");
    console.log(chalk.redBright("Social links:"));
    console.log("\t");
    console.log(
      `${chalk.black.bgWhite(
        "Github:"
      )}  \t https://github.com/Ahmednoorani258 `
    );
    console.log(
      `${chalk.black.bgWhite(
        "LinkedIn"
      )} \t https://www.linkedin.com/in/mahmednorani/`
    );
    console.log("\t");
    console.log("Thank You :)");

    process.exit(0); // Terminate Node.js process
  }

  async main() {
    while (true) {
      const ans = await TakeUserInput<{ input: string }>(
        "input",
        "list",
        "Select operation",
        ["1. Convert Number to Word", "2. Permutation Checker", "3. Exit"]
      );
      console.log("\t");

      switch (ans.input) {
        case "1. Convert Number to Word":
          await this.numToWords(); // Await the async method
          break;
        case "2. Permutation Checker":
          await this.permutations(); // Await the async method
          break;
        case "3. Exit":
          await this.exitProgram(); // Properly exit the program
          break;
        default:
          console.log("Invalid option. Please try again.");
          break;
      }
    }
  }
}
console.log("\t");
console.log("\t");
console.log(chalk.cyanBright.underline(`Giaic Student`));
console.log(chalk.whiteBright.bold("Welcome TO Mini CLi Project"));
console.log(chalk.whiteBright.bold("Created By: M.Ahmed Noorani"));
console.log("\t");
console.log("\t");
let start = new CLI();
