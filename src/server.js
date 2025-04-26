require("dotenv").config();
const app = require("./app");
const createAdminUser = require("./utils/createAdminUser");
const PORT = process.env.PORT || 4000;

const startServer = async () => {
  await createAdminUser();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
