

class UserController  {
    registerUser =  async (req, res, next) => {
        try {
            console.log('REGISTER USER')
        } catch (error) {
            console.log('ERROR:', error)
        }
    }

    loginUser =  async (req, res, next) => {
        try {
            console.log('LOGIN USER')
        } catch (error) {
            console.log('ERROR:', error)
        }
    }

    updateUser =  async (req, res, next) => {
        try {
            console.log('UPDATE USER')
        } catch (error) {
            console.log('ERROR:', error)
        }
    }

    deleteUser =  async (req, res, next) => {
        try {
            console.log('DELETE USER')
        } catch (error) {
            console.log('ERROR:', error)
        }
    }

}


module.exports = new UserController;