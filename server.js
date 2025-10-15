'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const db = require('./models');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.get('/test', (req, res) => {
    res.json({ message: 'Hello World' });
});

app.use('/api', routes);

// Not Found handler
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 4000;

async function start() {
    try {
        await db.sequelize.authenticate();
        console.log('Database connection established');

        const syncMode = (process.env.DB_SYNC || '').toLowerCase();
        if (syncMode === 'force') {
            await db.sequelize.sync({ force: true });
            console.log('Database synced with force: true (dropped and recreated tables)');
        } else if (syncMode === 'alter') {
            await db.sequelize.sync({ alter: true });
            console.log('Database synced with alter: true (safe schema changes)');
        } else {
            await db.sequelize.sync();
            console.log('Database synced');
        }
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}

start();


