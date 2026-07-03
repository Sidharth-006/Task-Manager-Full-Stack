const app = require("./app");
const sequelize = require("./config/database");
const env = require("./config/env");
const ensureAdminUser = require("./utils/seedAdmin");

// Import models and relationships
require("./domain");

const startServer = async () => {
  try {
    // Database Connection
    await sequelize.authenticate();
    console.log("✅ Database Connected Successfully");

    // Create Tables
    await sequelize.sync();
    console.log("✅ Database Synced Successfully");

    await ensureAdminUser();
    console.log("✅ Admin user ensured successfully");

    // Start Server
    app.listen(env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${env.PORT}`);
    });

  } catch (error) {
    console.error("❌ Server Error:", error.message);
  }
};

startServer();