const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userRegister = async (req, res) => {
  const { userName, email, name, password } = req.body;

  if (!userName || !email || !password || !name) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  // const userExit = await User.findOne({ email });
  const userExit = await User.findOne({ $and: [{email:email},{userName:userName}] });

  if (userExit) {
    res.status(200).json({ success:false, error: "user already registered" });
  }
  //hassword password
  const hasswordPassword = await bcrypt.hash(password, 10);
  // console.log(hasswordPassword)
  const user = await User.create({
    name,
    userName,
    email,
    password: hasswordPassword,
  });

  if (user) {
    res.status(200).json({ success: "true", _id: user.id, email: user.email, userName:user.userName });
  } else {
    res
      .status(400)
      .json({ success: "false", errorMsg: "User data is not valid" });
  }
};

const userLogin = async (req, res) => {
  const { password, userName } = req.body;
  if (!password || !userName) {
    res
      .status(400)
      .json({ success: "false", error: "all fields are mandatory" });
  }
  const user = await User.findOne({ userName });
  // compare  password with hashpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          userName: user.userName,
          email: user.email,
          name: user.name,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "30d" }
    );
    res.status(200).json({ success: "true", accessToken });
  } else {
    res
      .status(400)
      .json({ success: "false", error: "userName or password is not valid" });
  }
};

const getPlayer = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    res.status(200).json({ success: true, playerName: user.userName,id:user._id });
  } catch (error) {
    res.status(400).json({ success: false, error: "given email not exist" });
  }
};

const setIndexValue = async (req, res) => {
  const { userName, arrayData, turn, msg,isWinner,winnerValue } = req.body;
  try {
    const user = await User.findOne({ userName });
    if (user) {
       await User.updateOne({ userName },{ $set: { tags: [...arrayData] } },);
      await User.updateOne({ userName },{ $set: { turn } },);
      // 
      await User.updateOne({ userName },{ $set: { msg } },);
      await User.updateOne({ userName },{ $set: { isWinner } },);
      // 
      await User.updateOne({ userName },{ $set: { winnerValue } },
      );
      const user = await User.findOne({ userName });
      res.status(200).json({ success: true, user });
    }
  } catch (error) {
    res.status(400).json({ success: "false", message: "data is missing" });
  }
};

const getIndexValue = async (req, res) => {
  const playerName = req.params.playerName;
  // console.log("userName",playerName)
  try {
    const user = await User.findOne({ userName: playerName });
    if (user) {
      res.status(200).json({ success: "true", user });
    }
  } catch (error) {
    res.status(400).json({ success: "false", error: "user not exist" });
  }
};

const getUserCardDetails = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json({ user});
  } catch (error) {
    res.status(400).json({ success: "false", error: "card not exist" });
  }
};

const userCardCreate = async (req, res) => {
  const { playerName, time, msg } = req.body;
  try {
    const user = await User.findOne({ userName: playerName });
    if (user) {
      // await User.updateOne({userName:playerName},{ $set: { cardData: [...user.cardData,{playerName,time}] } });
      const updatedUser = await User.updateOne(
        { userName: playerName },
        { $set: { cardData: [{ playerName, time,msg }] } },
      
      );
      // console.log("update = ",updatedUser);
      // console.log("after");
      // console.log("msg ===", msg);
      // await User.updateOne({userName},{$set:{ tags:[...arrayData]}},{$set:{turn}})
      const user = await User.findOne({ userName: playerName });
      res.status(200).json({ success: true, user });
    }
  } catch (error) {
    res.status(400).json({ success: "false", message: "data is missing" });
  }
};

const saveWinnerName = async (req, res) => {
  const { userName, winnerName } = req.body;
  // console.log("userName",req.body)
  try {
    const user = await User.findOne({ userName });
    if (user) {
      const updatedUser = await User.updateOne(
        { userName},
        { winnerName },
      
      );
      res.status(200).json({ success: "true", user });
    }
  } catch (error) {
    res.status(400).json({ success: "false", error: "user not exist" });
  }
};
const saveWinnerValue = async (req, res) => {
  const { userName, winnerValue } = req.body;
  // console.log("userName",req.body)
  try {
    const user = await User.findOne({ userName });
    if (user) {
      const updatedUser = await User.updateOne(
        { userName },
        { $set: { winnerValue } },
      );
      res.status(200).json({ success: "true", updatedUser });
    }
  } catch (error) {
    res.status(400).json({ success: "false", error: "user not exist" });
  }
}

module.exports = {
  // getUser,
  // addUser,
  userLogin,
  userRegister,
  getPlayer,
  getIndexValue,
  setIndexValue,
  userCardCreate,
  getUserCardDetails,
  saveWinnerName,
  saveWinnerValue,
};
