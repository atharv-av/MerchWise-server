const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./db/database");

// Config
dotenv.config({ path: "./.env" });

// Database Connection
connectDatabase()

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
