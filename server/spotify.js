const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");

const app = express();

router.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = SpotifyWebApi({
    redirectUri: "http://localhost:8080",
    clientId: "6d4168952f4841ab9cccc39d98b9262a",
    clientSecret: "fd08327820924115a9d3571014af7b24",
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        expireIn: data.body.expires_in,
      });
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

router.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = SpotifyWebApi({
    redirectUri: "http://localhost:8080",
    clientId: "6d4168952f4841ab9cccc39d98b9262a",
    clientSecret: "fd08327820924115a9d3571014af7b24",
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

// // import { createRequire } from "module";
// // const require = createRequire(import.meta.url);

// var SpotifyWebApi = require('spotify-web-api-node');
// const express = require('express');
// const fs = require('fs')
// //const db = require("./db");

// const scopes = [
//     'ugc-image-upload', 'user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing', 'streaming', 'app-remote-control', 'user-read-email',
//     'user-read-private', 'playlist-read-collaborative', 'playlist-modify-public', 'playlist-read-private', 'playlist-modify-private', 'user-library-modify',
//     'user-library-read', 'user-top-read', 'user-read-playback-position', 'user-read-recently-played', 'user-follow-read', 'user-follow-modify'
//   ];

// module.exports = function (router) {

//   var spotifyApi = new SpotifyWebApi({
//     clientId: '78392f70fe8f4172976a0684b5e02006',
//     clientSecret: 'eaad91c665664001b006671830b2f366',
//     redirectUri: 'http://localhost:8080/api/spotify/callback'
//   });

//   router
//     .get('/home/test', (req, res) => {
//       res.send("ok, thats great, routes are up ! ;)");
//     })

// router
//   .get('/api/spotify/login', (req, res) => {
//     res.redirect(spotifyApi.createAuthorizeURL(scopes));
//   });

//   router
//     .get('/api/spotify/callback', (req, res) => {
//       const code = req.query.code;
//       const state = req.query.state;

//       spotifyApi
//         .authorizationCodeGrant(code)
//         .then(data => {
//           const access_token = data.body['access_token'];
//           const refresh_token = data.body['refresh_token'];
//           const expires_in = data.body['expires_in'];

//           spotifyApi.setAccessToken(access_token);
//           spotifyApi.setRefreshToken(refresh_token);

//           console.log('\n\n access_token:', access_token);
//           console.log('\n\n refresh_token:', refresh_token);
//           console.log(`\n\nSucessfully retreived access token. Expires in ${expires_in} s.`);
//           res.redirect('http://localhost:8080/api/spotify/mydata');

//           setInterval(async () => {
//             const data = await spotifyApi.refreshAccessToken();
//             const access_token = data.body['access_token'];

//             console.log('The access token has been refreshed!');
//             console.log('access_token:', access_token);
//             spotifyApi.setAccessToken(access_token);
//           }, expires_in / 2 * 1000);
//         })
//         .catch(error => {
//           console.error('Error getting Tokens:', error);
//           res.send(`Error getting Tokens: ${error}`);
//         });

//   });

//   router
//     .get('/api/spotify/mydata', (req, res) => {
//       getMyData();
//       res.redirect('http://localhost:8080/home/test');
//     });

//   function getMyData() {
//       (async () => {
//         const mydata = await spotifyApi.getMe();
//         console.log("\n\n\n\n GET MY DATA : \n\n");
//         console.log(mydata.body);
//         getUserPlaylists(mydata.body.id);
//       })().catch(e => {
//         console.error(e);
//       });
//     }

//   async function getUserPlaylists(userName) {
//       const data = await spotifyApi.getUserPlaylists(userName)
//       console.log("\n" + data.body);
//       let playlists = []

//       for (let playlist of data.body.items) {
//         console.log("\n LOOK AT THIS : \n\n" + playlist.name + " " + playlist.id)

//         let tracks = await getPlaylistTracks(playlist.id, playlist.name);
//         // console.log(tracks);
//         const tracksJSON = { tracks }
//         let data = JSON.stringify(tracksJSON);
//         fs.writeFileSync(playlist.name+'.json', data);
//       }
//     }

//   async function getPlaylistTracks(playlistId, playlistName) {
//       const data = await spotifyApi.getPlaylistTracks(playlistId, {
//         offset: 1,
//         limit: 100,
//         fields: 'items'
//       })

//       console.log('\n\nThe playlist contains these tracks', data.body);
//       console.log('\n\nThe playlist contains these tracks: ', data.body.items[0].track);
//       console.log("\n\n'" + playlistName + "'" + ' contains these tracks:');
//       let tracks = [];

//       for (let track_obj of data.body.items) {
//         const track = track_obj.track
//         tracks.push(track);
//         console.log(track.name + " : " + track.artists[0].name)
//       }
//       return tracks;
//     }
// }
