const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

class AuthController {
  async register(req, res) {
    try {
      const { phone, fullName } = req.body;

      let user = await userModel.findOne({ phone });
      if (!user) {
        user = await userModel.create({ phone, fullName });
      }

      const token = jwt.sign(
        { _id: user._id, phone: user.phone },
        process.env.JWT_SECRET,
        { expiresIn: "30d" },
      );

      return res.json({ user, token });
    } catch (err) {
      console.log(err);
    }
  }

  async getMe(req, res) {
    try {
      console.log(req);

      const token = req.cookies.token;
      if (!token) return res.json({ user: null });

      const jwtUser = jwt.verify(token, process.env.JWT_SECRET);
      if (!jwtUser) return res.json({ user: null });

      const user = await userModel.findById(jwtUser._id);
      if (!user._id) return res.json({ user: null });

      return res.json({ user });
    } catch (err) {
      console.log(err);
    }
  }

  async logout(req, res) {
    res.clearCookie("token");
    return res.json({ success: true });
  }
}

module.exports = new AuthController();
