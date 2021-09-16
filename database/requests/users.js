const {dataUsers} = require( "../database");


const newUsers = (req, res) => {
    const {login, password, role } = req.body;
    dataUsers.insert({login, password, role });
    res.status(201).json({ message: "AddUsers" });
};

module.exports = {
    newUsers,
}