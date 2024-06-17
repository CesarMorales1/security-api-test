import jwt from "jsonwebtoken";

const jwtVerification = (token) => 
    {
        return jwt.verify(token,process.env.__PRIVATE_KEY)
    }

export {jwtVerification}