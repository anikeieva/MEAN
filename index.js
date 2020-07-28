const app = require('./app');
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello word');
});

app.listen(port, () => console.log(`App listening on port ${port}`));
