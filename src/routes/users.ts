import express, {Request, Response, NextFunction, Router} from 'express';
const isValid = require('mongoose').mongo.ObjectId.isValid;

const router: express.Router = Router(); //Router is of typescript router type;

//Import model
import IUser from '../interfaces/IUser';
import { User, IUserDocument } from '../models/User';



router.get('/',  async(request: Request, response: Response, next: NextFunction) => {

    let users : IUserDocument[];

    users = await User.find();

    response
        .status(200)
        .json(users);

});

router.post('/', async(request: Request, response: Response, next: NextFunction) => {
    try {
        const {
            email,
            password,
            avatar
        } = request.body;

        let user: IUser;
        let userDoc: IUserDocument;

        //VALIDATION
        if (!email || !password) return response.status(422).json({message: 'Email and password field are required.'});

        //USER
        user = {
            email,
            password
        };

        if (avatar) user.avatar = avatar;

        userDoc = new User(user);

        userDoc.password = await userDoc.hash();

        await userDoc.save();

        response
            .status(200)
            .json({message: 'User created'});

    }catch(err) {

        next(err);

    }

});

router.get('/:id', async(request: Request, response: Response, next: NextFunction) => {
   const {
       id
   } = request.params;

   let user : IUserDocument;

   if(!isValid(id)) return response.status(400).json({message: 'User id is not valid.'});

   user = await User.findById(id, '-password');

   response
       .status(200)
       .json(user);

});

/* AUTHENTICATION LOGIC NEEDED

router.delete('/', auth, async(request:Request, response:Response, next:NextFunction) => {
    let result : any;

    result = await User.deleteOne({_id: request.user._id});

    response
        .status(200)
        .json(result);
});

*/

router.delete('/:id', async(request: Request, response: Response, next: NextFunction) =>{
    const {
        id
    } = request.params;

    let result: any;

    result = await User.deleteOne({_id: id});

    response
        .status(200)
        .json(result);
});

export default router;





