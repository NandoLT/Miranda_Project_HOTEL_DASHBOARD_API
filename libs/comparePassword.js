const bcrypt = require('bcrypt');

const comparePassword = async (password, queryPassword) => {
    return await bcrypt.compare(password, queryPassword);
}

module.exports = comparePassword;