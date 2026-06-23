const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        let decodedData = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedData && decodedData.role == 'admin') {
            next();
        } else {
            res.status(403).json({ message: "Access denied. Admin privileges required." });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong while validating token' });
    }
}

module.exports = jwtMiddleware;