import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });

    res.cookie("jwt", token, {
        maxAge: 15*24*60*60*1000, // ms
        httpOnly: true, // prevent XXS attacks cross-site scripting attacs
        sameSite: "strict", // CSRF attacs cross-site request forgery attacs
        secure: process.env.NODE_ENV !== "development",
    });
}

export default generateTokenAndSetCookie;