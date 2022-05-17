const bcrypt = require('bcrypt');

const comparePassword = async (password:string, queryPassword:string) : Promise<boolean> => {
    return await bcrypt.compare(password, queryPassword);
}

module.exports = comparePassword;