const auth = (req, res, next) => {
  const cookie = req.cookies && req.cookies.auth;
  if (!cookie) return next();
  try {
    const user = JSON.parse(decodeURIComponent(cookie));
    req.user = user;
  } catch {
    req.user = null;
  }
  next();
};
module.exports = auth;

