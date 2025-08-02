import jwt from "jsonwebtoken";


const isAuthenticated =  (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User is not found",
                success: false
            })
        }
       
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            })
        }
        req.id = decode.userId;
        next();
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        console.log(error);

    }
}
export default isAuthenticated;