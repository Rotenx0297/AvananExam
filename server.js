const express = require("express");
const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const app = express();
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://3.144.201.195:9200' })

var credentials = new AWS.SharedIniFileCredentials({ profile: 'default' });
AWS.config.credentials = credentials;

var bucketParams = {
    Bucket: 'exam-checkpoint-rotem',
    Key: 'rotem.txt',
};
app.get('/print', (req, res) => {
    s3.getObject(bucketParams, function (err, data) {
        if (err) {
            res.send(err.message)
            return err;
        }
        let objectData = data.Body.toString('utf-8');
        res.send(objectData);
    });
});
app.get('/log/:text', (req, res) => {
    client.index({
        index: 'rotem-example',
        body: {
            text: req.params.text
        }
    }).then((response) => {
        console.log(response);
        res.status(200).end()
    })
});

app.listen(80, () => {
    console.log("Server running on port 80");
});