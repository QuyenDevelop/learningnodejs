const User = require("../modals/User");
const jwt = require("jsonwebtoken");

module.exports.register = async (request, response) => {
  const { username, password } = request.body;

  // check if the user is empty
  if (!username || !password) {
    return response.status(400).json({
      success: false,
      message: "Username and password are required",
    });
  }

  try {
    // check if Username is already registered
    const user = await User.findOne({ username });
    if (user) {
      return response.status(400).json({
        success: false,
        message: "Username is already registered",
      });
    }
    // create a new user
    const newUser = new User({ username, password });
    await newUser.save();

    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_TEST,
    );
    response.json({
      success: true,
      message: "created successfully !!!",
      accessToken: accessToken,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;

  // check if the user is empty
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Mày chưa nhập tài khoản hoặc mật khẩu kìa hải óc tó",
    });
  }

  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "thằng hải chưa đăng ký",
      });
    }
    if (password !== user.password) {
      return res.status(400).json({
        success: false,
        message: "thằng hải sai tài khoản hoặc mật khẩu",
      });
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_TEST,
    );
    return res.json({
      success: true,
      message: "thằng hải đăng nhập thành công",
      accessToken: accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
