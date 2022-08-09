exports.restricts = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.principle.role)) {
      return new Error("Not Authenticated");
    }
    next();
  };
};
