const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const SpotifyWebApi = require('spotify-web-api-node')

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.post('/refresh',(req,res)=>{
    const refreshToken = req.body.tokenAtt
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: '1291da22230a4deba7a9f66e364d1b63',
        clientSecret: '1b81685a39644af88c52c160d4c6567e',
        refreshToken,
    })
    spotifyApi.refreshAccessToken().then(
        (data)=>{
          res.json({tokenAcesso:data.body.access_token,
                expiraEm:data.body.expires_in,
            })
        }).catch(()=>{
            res.sendStatus(400)
        })
})

app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: '1291da22230a4deba7a9f66e364d1b63',
        clientSecret: '1b81685a39644af88c52c160d4c6567e'
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            tokenAcesso: data.body.access_token,
            tokenAtt: data.body.refresh_token,
            expiraEm: data.body.expires_in,
        })
    }).catch(() => {
        res.sendStatus(400)
    })
})

app.listen(3001)