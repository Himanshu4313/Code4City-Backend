const isAdmin = async (req, res, next) => {
  if (req.user.role == "ADMIN") {
    next();
  }
  return res
    .status(400)
    .json({ success: false, message: "Unauthorized person" });
};

export default isAdmin;
