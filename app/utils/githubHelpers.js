var axios = require('axios');
var id = "YOUR_CLIENT_ID";
var sec = "YOUR SECRET_ID";
var param = "?client_id=" + id + "&client_secret=" + sec;
var logCustomMessage = require('./logCustomMessage');

function getUserInfo (username) {
    return axios.get('https://api.github.com/users/' + username + param)
}

function getRepos(username) {
    //fetch usenames repos
    return axios.get('https://api.github.com/users/' + username +'/repos'+ param+'&per_page=100')
}

function getTotalStars(repos) {
    //get array of repositories and calculate total stars
    return repos.data.reduce(function (acc, curr){
        return acc + curr.stargazers_count
    }, 0)
}
function getPlayersData(player) {
    //get repos and pass to getTotalStars
    return getRepos(player.login)
       .then(getTotalStars)
       .then(function (totalStars) {
           return {
               followers: player.followers,
               totalStars: totalStars
           }
       })
}

function calculateScores(players) {
    //return an array after doing some fancy algorithms to determine a winner
    return [
        players[0].followers * 3 + players[0].totalStars,
        players[1].followers * 3 + players[1].totalStars
    ]
}

var helpers = {
    getPlayersInfo: function(players) {
        return axios.all(players.map(function (username) {
            return getUserInfo(username);
        })).then(function (info) {
            return info.map(function (user) {
                return user.data;
            })
        }).catch(function (err){
            return logCustomMessage(error.statusText, {
                players: players,
                error: error,
            })
        })
    },

    battle: function(players) {
        var playerOneData = getPlayersData(players[0]);
        var playerTwoData = getPlayersData(players[1]);

        return axios.all([playerOneData, playerTwoData])
            .then(calculateScores)
            .catch(function (err){
                return logCustomMessage(error.statusText, {
                    players: players,
                    error: error,
                })
            })
    }

};

module.exports = helpers;
