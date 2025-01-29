import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  const authorization_token = req.headers.authorization;
  if (!authorization_token) {
    return res.send({ message: 'Not Authorised, Token Required' });
  }
  try {
    const token = authorization_token.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.send({ message: 'Invalid Token, Try Again' });
  }
};

export default authMiddleware;
