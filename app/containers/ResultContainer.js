var React = require('react');
var PropTypes = React.PropTypes;
var Results = require('../components/Result');
var githubHelpers = require('../utils/githubHelpers')

var ResultsContainer = React.createClass({
    getInitialState: function() {
            return {
                isLoading: true,
                scores: []
            }
    },
    componentDidMount: function () {
            //calculate score and declare a winner
            console.log(this.props.location.state.playerInfo)
            //in here, players battle each other (compare likes and followers)

            githubHelpers.battle(this.props.location.state.playerInfo)
            .then(function(scores) {
                this.setState({
                    scores: scores,
                    isLoading: false
                })
            }.bind(this))
    },
    render: function() {
        return (
            <Results
            isLoading={this.state.isLoading}
            scores={this.state.scores}
            playersInfo={this.props.location.state.playerInfo}/>
        )
    }

});

module.exports = ResultsContainer;
