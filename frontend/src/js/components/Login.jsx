const React = require('react');
const { Button, PageHeader } = require('react-bootstrap');

class Login extends React.Component {
  render() {
    return (
      <div className="login">
          <PageHeader> Login <small>with Google+ or Facebook</small> </PageHeader>
          <div className="login-buttons">
            <Button className="google-social" href="http://localhost:4444/auth/google" bsStyle="danger" bsSize="lg">
                <i className="fa fa-google"></i> Google
            </Button>
            <br/>
            <Button className="facebook-social" href="http://localhost:4444/auth/facebook" disabled bsStyle="primary" bsSize="lg">
                <i className="fa fa-facebook"></i> Facebook
            </Button>
          </div>
      </div>
    );
  }
}

module.exports = Login;
