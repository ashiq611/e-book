import express from 'express';

const app = express();


// routes
app.get('/', (req, res) => {
    res.json({
        status: "success",
        message: "Backend is running"
    });
});






export default app;