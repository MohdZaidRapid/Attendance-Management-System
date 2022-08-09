exports.restricts = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return new Error("Not Authenticated");
    }
    next();
  };
};
