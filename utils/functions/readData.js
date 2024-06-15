import fs from "fs";

/* env */
const FILE_PATH = process.env.FILE_PATH;

/**
 * Reads data from a file specified by FILE_PATH and parses it as JSON.
 *
 * @returns {Object} The parsed data from the file.
 */
function readData() {
  const data = fs.readFileSync(FILE_PATH);
  return JSON.parse(data);
};

export default readData;
