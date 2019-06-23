import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import usersRouter from './routes/users';
import bodyParser = require("body-parser");

class App {

    //EXPRESS INSTANCE
    public app: Application;

    constructor() {

        //CREATE EXPRESS INSTANCE
        this.app = express();

        //SETUP PORT
        this.app.set('PORT', process.env.PORT || 8000);

        //ATTACH API
        this.api();

    }

    private api() {

        //CORS
        this.app.use((request: Request, response: Response, next: NextFunction) => {

            response.set({
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept'
            });

            //GO TO NEXT MIDDLEWARE
            next();

        });

        //REQUEST LOGGER
        this.app.use(morgan('dev'));

        //PARSER
        this.app.use(bodyParser.json());

        //INIT USER ROUTES
        this.app.use('/api/users', usersRouter);

        //404
        this.app.use((request:Request, response:Response, next: NextFunction) => {
            response
                .status(404)
                .send('PAGE NOT FOUND');
        });


        //ERROR HANDLER
        this.app.use((error: any, request: Request, response: Response, next: NextFunction) => {

            const status = error.status || 500;

            if(process.env.NODE_ENV === 'development'){

                console.log(error);

                response
                    .status(status)
                    .json({
                        error
                    });

            }else{

                response
                    .status(status)
                    .json({
                        message: 'SERVER ERROR OCCURRED. CONTACT SERVER ADMINISTRATOR'
                    });

            }

        });


    }
}

export default new App().app;