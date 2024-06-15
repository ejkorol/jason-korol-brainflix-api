/**
 * Generates a pseudo-random UUID.
 * @returns {string} A pseudo-random UUID string.
 */
function uuid() {
  return Math.random().toString(16).slice(2);
};

export default uuid;
