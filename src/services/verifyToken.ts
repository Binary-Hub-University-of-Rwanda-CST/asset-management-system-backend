import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); 

const verifyToken = (token:string) => {
    const data = jwt.verify(token, process.env.JWT_SECRET as Secret)
    
    return data;
  };

  export default verifyToken