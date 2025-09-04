exports.getLogin = (req, res, next) => {
  res.render("auth/login", { pageTitle: "Login", currentPage: "login" });
};

exports.postLogin = (req, res, next) => {
  res.redirect("/");
};
