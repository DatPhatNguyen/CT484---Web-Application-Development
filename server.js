const app = require("./app");
const config = require("./app/config"); // require config object and params in
const MongoDB = require("./app/utils/mongodb.utils");
async function startServer() {
  try {
    await MongoDB.connect(config.db.uri); //  class: MongoDB /  method: connect  /  config object > db > uri (database location)
    console.log("Connected to the database!");
    const PORT = config.app.port; // object config > app > port
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Cannot connect to database !", error);
    process.exit();
  }
}
startServer();
