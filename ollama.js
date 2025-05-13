import { spawn } from "child_process";

/**
 * Sends code to Ollama for refactoring.
 * @param {string} code - The code to refactor.
 * @returns {Promise<string>} - The refactored code or feedback from Ollama.
 */
export async function generateRefactor(code) {
  return new Promise((resolve, reject) => {
    let result = "";

    const ollama = spawn("ollama", [
      "run",
      "llama3",
      `Please refactor the following code for performance, readability, and best practices. If the code is already optimal, say so clearly. Only return the full final refactored code or say it's optimal.\n\n${code}`
    ]);

    ollama.stdout.on("data", (data) => {
      result += data.toString();
    });

    ollama.stderr.on("data", (data) => {
      console.error("Ollama stderr:", data.toString());
    });

    ollama.on("close", (code) => {
      if (code === 0) {
        resolve(result.trim());
      } else {
        reject(new Error("Ollama process failed with code " + code));
      }
    });
  });
}
