const express = require("express");
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("client/build"));

if (process.env.PRODUCTION_URL) {
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client/build/index.html"));
    });
};

app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});