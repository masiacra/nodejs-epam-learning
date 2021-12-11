import express from 'express';
import { PORT } from './config/application.config';
import { sequelize } from './config/database.config';
import { improveApplication } from './loaders/application.loader';
import { logger } from './config/logger.config';

const main = async () => {
    const application = express();

    await improveApplication(application);

    try {
        await sequelize.authenticate();
        logger.info(
            'Connection with database has been established sucessfully.',
        );
        application.listen(PORT, () =>
            logger.info(`server is running on port ${PORT}`),
        );
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

main();

process.on('SIGTERM', () => {
    sequelize.close();
});

process.on('uncaughtException', (error) => {
    logger.error(error);
    sequelize.close();
    process.exit(2);
});

process.on('unhandledRejection', (error) => {
    logger.error(error);
    sequelize.close();
    process.exit(3);
});
