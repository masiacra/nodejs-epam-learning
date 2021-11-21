import express from 'express';
import { PORT } from './config/application.config';
import { sequelize } from './config/database.config';
import { improveApplication } from './loaders/application.loader';

const main = async () => {
    const application = express();

    await improveApplication(application);

    try {
        await sequelize.authenticate();
        console.log(
            'Connection with database has been established sucessfully.',
        );
        application.listen(PORT, () =>
            console.log(`server is running on port ${PORT}`),
        );
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

main();

process.on('SIGTERM', () => {
    sequelize.close();
});
