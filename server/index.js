const express = require('express')
const app = express()
const VideoModel = require('../db/VideoModel');

const PORT = process.env.PORT || 3001;

if (!process.env.JEST_WORKER_ID) {
  const db = require('../db/index.js');
}

app.use('/assets', express.static('public'))

app.get('/video-player-service/api/get-video', (req, res) => {
  console.log(`Serving GET request on path: ${req.path}`)

  let params;

  if (req.query.videoId) {
    params = { videoYouTubeId: req.query.videoId }
  } else {
    randomIndex = Math.floor(Math.random() * 100)
    params = { videoIndex: randomIndex }; 
  }
  
  VideoModel.findOne(params, function (err, video) {
    if (err) {
      console.log(err)
      res.send(500, 'video not found!')
    } else {
      res.send(video)
    }
  });
})

// catch-all
app.get('*', (req, res) => {
  console.log(`Serving GET request on path: ${req.path}`)
  res.send(404, 'This page does not exist! Please try another URL, or go back to home page!')
})
const server = app.listen(PORT, () => { console.log(`Video Player Service listening on port ${PORT}!`) })

module.exports = server;

//http://fec-ks-video-player.hussx9vrbw.us-west-2.elasticbeanstalk.com/