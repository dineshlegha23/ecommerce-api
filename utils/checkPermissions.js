const { UnauthorizedError } = require("../errors");

const checkPermmissions = (requestUser, resourceUserId) => {
  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;

  throw new UnauthorizedError("Not authorized to access this route");
};

module.exports = checkPermmissions;
