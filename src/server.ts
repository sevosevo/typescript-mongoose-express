import app from './app';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import config from './config/configuration';

mongoose.connect(config.mongodbUri)
    .then(() => {
        app.listen(
            app.get('PORT'),
            () => console.log('Server started on port '+app.get('PORT'))
        );
    })
    .catch(err  => {
        console.error(err);
        process.exit(1);
    });


//EXPORTING SERVER INSTANCE FOR TESTING
module.exports = app;


//LOG ANY UNCAUGHT ERROR
process.on('uncaughtException', (err) => {

    console.log(err);

    fs.readFile(path.join(__dirname, '../logger.json'), 'utf8', (error, data) => {
        if(error){

            console.error(error);

            process.exit(1);

        }

        let parsed : object[] = JSON.parse(data);

        parsed.push({error: err.message, date: new Date(Date.now()) });

        const newError : string = JSON.stringify(parsed);

        fs.writeFile(path.join(__dirname, '../logger.json'), newError, (error) => {
            if(error){

                console.error(error);

                process.exit(1);

            }
        })

    });

});
