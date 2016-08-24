var React = require('react');
var ReactDOM = require('react-dom');
var routes = require('./config/routes');

var Raven = require('raven-js');

var sentryKey = '213f6f78df744b77b036bd9a4d740e33';
var sentryApp = '92901';
var sentryURL = 'https://'+sentryKey+'@app.getsentry.com/'+sentryApp;

var _APP_INFO = {
    name: 'Github Battle',
    branch: 'video 4',
    version: '1.0'
}

window.onerror = function () {
    Raven.showReportDialog();
}

Raven.config(sentryURL, {
    release: _APP_INFO.version,
    tags: {
        branch: _APP_INFO.branch
    }

}).install()

ReactDOM.render(
    routes,
    document.getElementById('app')
)


/*
var USER_DATA = {
    name: 'Roland Zeng',
    username: 'rzeng95',
    image: 'https://avatars0.githubusercontent.com/u/11772350?v=3&s=460'
}

var ProfilePic = React.createClass({
    render: function() {
        return <img src={this.props.imageUrl} style={{height:100,width:100}} />
    }
});

var Link = React.createClass({
    changeURL: function() {
        window.location.replace(this.props.href)
    },
    render: function() {
        return (
            <span style={{color: 'blue', cursor: 'pointer'}}
            onClick={this.changeURL}>
                {this.props.children}

            </span>
        )
    }

});


var ProfileLink = React.createClass({
    render: function() {
        return(
            <div>
            <Link href={'http://github.com/' + this.props.link}>
                {this.props.link}
            </Link>

            </div>
            )
    }
});

var ProfileName = React.createClass({
    render: function() {
        return(
            <div>
                {this.props.name}
            </div>
        )
    }


});

var Avatar = React.createClass({
    render: function() {
        return(
            <div>
                <ProfilePic imageUrl={this.props.user.image}/>
                <ProfileName name={this.props.user.name}/>
                <ProfileLink link={this.props.user.username}/>
            </div>
        )
    }
})

ReactDOM.render(
    <Avatar user={USER_DATA} />,
    document.getElementById('app')
)
*/
