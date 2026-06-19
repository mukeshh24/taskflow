import errorHandler from "../utils/errorHandler.js";
import verifyToken from "../utils/verifyToken.js";

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return next(errorHandler(403, "Un-authorized"));
    }

    const decoded  = verifyToken(token);
    req.user = decoded ;
    next();
  } catch (error) {
    next(error);
  }
};

export default protect;
