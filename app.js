var Twitter = require('twitter');
const fs = require('fs');
var json2csv = require('json2csv');
//var Twit = require('twit');
var config = require('./config.js');
var T = new Twitter(config);
var mongo = require('mongodb');
var mongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/";

var params = {
  q: '#bahubali -filter:retweets',
  count: 5,
  result_type: 'recent',
  lang: 'en'
}
// var stream = T.stream('statuses/filter', {track: params});
// stream.on('tweet', function(tweet) {
//   console.log(tweet);
// })

T.get('search/tweets', params, function(err, tweet, response) {

var i;
var a = [];

for(i=0;i<params.count;i++){
a = tweet.statuses[i].text;
var insertObj = JSON.parse(JSON.stringify(tweet));
console.log(a);
}

mongoClient.connect(url, function(err,db){



  if(err){
    console.log('ERROR: Cannot connect to mongo, tweets will not be logged');
  }
var dbo = db.db("mydb");


for(i=0;i<params.count;i++){

  dbo.collection("tweets").insertOne(insertObj,function(err,res){
    if(err) throw err;
    console.log('Connected to mongo');

db.close();

});
}
});
const mongotocsv = require('mongo-to-csv');
let options = {
    database: 'mydb',
    collection: 'tweets',
    fields: ['id', 'created_at', 'text','retweet_count', 'favourite_count','screen_name'],
    output: './output/data.csv',

};
mongotocsv.export(options, function (err, success) {
    console.log(err);
    console.log(success);
});

});
