import fs from "fs";

/* env */
const FILE_PATH = process.env.FILE_PATH;

/**
 * Writes the given data to file specified by FILE_PATH.
 * The data is stringified to JSON format before writing.
 *
 * @param {Object} data - The data to be written to the file.
 */
function writeData(data) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data));
};

export default writeData;
