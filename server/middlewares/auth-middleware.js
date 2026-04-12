const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    

    const jwtToken = token.replace('Bearer ', '').trim();

    

    try {

        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        
        const userData = await UserModel.findOne({ email: isVerified.email }).
        select({
            password: 0
        });

        req.GetUser = userData;
        req.token = jwtToken;
        req.userID = userData._id;     
        
        next();


} catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};


module.exports = authMiddleware;

