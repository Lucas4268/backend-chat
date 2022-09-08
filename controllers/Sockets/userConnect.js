const User = require("../../models/User");

const userConnect = async (_id) => {
    const user = await User.findById(_id);
    user.online = true;
    await user.save();

    return user
};

module.exports = userConnect;