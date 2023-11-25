import express, {Request, Response} from 'express';
const cors = require('cors');
require('dotenv').config();
import passport from '../services/passport-config';
import authenticateJWT from '../services/authMiddleware';


const app = express();
app.use(express.json());
app.use(cors());
app.use(passport.initialize());


app.get('/', (req: Request, res: Response) => {
    res.json({resStatus: true, resMsg: "AMS Server is running Smoothly!"})
})


app.get('/api/protected', authenticateJWT, (req, res) => {
    res.json({ message: 'Protected route'});
  });


app.listen(process.env.PORT || 9090, ()=>{
    console.log('AMS is running on PORT: ' + process.env.PORT);
} )