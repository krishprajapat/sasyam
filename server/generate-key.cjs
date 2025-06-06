const crypto = require("crypto");
const key = crypto.randomBytes(32).toString("hex");
console.log("Your secure session key:", key);
