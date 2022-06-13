const jwt = require('jsonwebtoken');

module.exports = {
    VerifyToken: (req, res, next) => {
        const jwtToken = req.get('Authorization') || req.query.token || req.body.token
        if (!jwtToken) {
            res.status(401).json({ result: "Unauthorizaed operation. Not valid Token or not provided" });
        }

        jwt.verify(jwtToken, process.env.JWT_SECRET, (err, payload) => {
            if(err) {
                res.status(401).json({ result: "Unauthorizaed operation. Not valid Token or not provided" });
            }
            // TODO: : take userid from payload and insert in request to pass info to the next middleware to implement user verification
            req.params.authUserId = payload.id;
            // TODO: int his case we can use role verification to do some operations ( register, delete, update, )
            next();
        })
    },

    Sign: (user, expiration, callback) => {
        return jwt.sign({user}, process.env.JWT_SECRET, { expiresIn: expiration }, callback);
    }
}