
var React = require('react');
var Router = require('react-router');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var Repos = require('./Github/Repos');
var UserProfile = require('./Github/UserProfile');
var Notes = require('./Notes/Notes');

var Profile = React.createClass({

  mixins: [ReactFireMixin],

  getInitialState: function() {

    return {
      // temporary test data to verify UI
      notes: [1, 2, 3],
      bio: {
        name: "Mukund Goel"
      },
      repos: ['a', 'b', 'c']
    }

  },

  componentDidMount: function() {
    // called when component gets mounted in the React DOM
    this.ref = new Firebase('https://incandescent-torch-3919.firebaseio.com/');
    var childRef = this.ref.child(this.props.params.username);
    this.bindAsArray(childRef, 'notes'); // this.state.notes
  },

  render: function() {

    return (
      <div className="row">
        <div className="col-md-4">
          <UserProfile username={this.props.params.username} bio={this.state.bio} />
        </div>
        <div className="col-md-4">
          <Repos username={this.props.params.username} repos={this.state.repos} />
        </div>
        <div className="col-md-4">
          <Notes username={this.props.params.username} notes={this.state.notes} />
        </div>
      </div>
    )
  }
});

module.exports = Profile;