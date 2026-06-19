import jwt from "jsonwebtoken";

const verifyToken = (payload) => {
  return jwt.verify(payload, process.env.JWT_SECRET_KEY);
};

export default verifyToken;
