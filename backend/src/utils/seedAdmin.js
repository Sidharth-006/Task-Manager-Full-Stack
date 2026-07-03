const { User } = require("../domain");
const { hashPassword } = require("./bcrypt");
const env = require("../config/env");

const ensureAdminUser = async () => {
  const adminEmail = env.ADMIN_EMAIL || "admin@taskmanager.com";
  const adminName = env.ADMIN_NAME || "Admin";
  const adminPassword = env.ADMIN_PASSWORD || "Admin@123";

  if (!adminEmail || !adminPassword) {
    return null;
  }

  let adminUser = await User.findOne({
    where: { email: adminEmail },
  });

  if (!adminUser) {
    adminUser = await User.findOne({
      where: { role: "ADMIN" },
    });
  }

  if (!adminUser) {
    const hashedPassword = await hashPassword(adminPassword);

    adminUser = await User.create({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: "ADMIN",
      isActive: true,
    });

    return adminUser;
  }

  adminUser.name = adminName;
  adminUser.email = adminEmail;
  adminUser.role = "ADMIN";
  adminUser.isActive = true;

  if (adminUser.password) {
    adminUser.password = await hashPassword(adminPassword);
  }

  await adminUser.save();

  return adminUser;
};

module.exports = ensureAdminUser;
