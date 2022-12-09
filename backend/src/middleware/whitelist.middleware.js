exports.whitelist = (paths = []) => {
  console.log(paths);
  return (req, res, next) => {
    const fullPath = req.baseUrl + req.path;
    req.isWhitelist = false;
    paths.forEach((path) => {
      if (fullPath.includes(path)) {
        req.isWhitelist = true;
      }
    });
    next();
  };
};
