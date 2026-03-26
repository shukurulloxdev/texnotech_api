const otpModel = require("../models/otp-model");

class OtpController {
  async sendOtp(req, res) {
    try {
      const { phone } = req.body;

      const otp = 12345;
      await otpModel.deleteMany({ phone });
      await otpModel.create({
        phone,
        otp,
        expireAt: Date.now() + 1 * 60 * 1000,
      });
      res.json({ status: 200 });
    } catch (err) {
      console.log(err);
    }
  }

  async verifyOtp(req, res) {
    try {
      const { phone, otp } = req.body;

      const otpArrey = await otpModel.find({ phone });
      if (!otpArrey) return res.json({ failure: "Record not found 1" });

      const dbOtp = otpArrey[otpArrey.length - 1];
      if (!dbOtp) return res.json({ failure: "Record not found 2" });

      if (dbOtp.expireAt < new Date()) return res.json({ status: 301 });

      if (dbOtp.otp !== otp) return res.json({ failure: "Invalid Otp" });

      await otpModel.deleteMany({ phone });

      res.json({ status: 200 });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new OtpController();

// await otpModel.deleteMany({ phone });
