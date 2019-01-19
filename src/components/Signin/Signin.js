import React from 'react';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword : ''
    }
  }
  // when change occurs in the field, the state is equal to that input form the user

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value })
  }
  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value })
  }
// sending the data as a POST method
  onSubmitSignin = () => {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user.id){
        if(this.isSignedIn === true){
          this.props.onRouteChange('home');

        } else{
          this.props.onRouteChange('home');
          this.props.loadUser(user)
        }
      }
    })
    }
// onClick is used to perform the function when an event ( typing in box) has occurred
  render() {
    const { onRouteChange } = this.props;
    return  (
      <article className="br3 shadow-5 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
        <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="email"
              name="email-address"
              id="email-address"
              onChange={this.onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input
              className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
               type="password"
               name="password"
               id="password"
               onChange={this.onPasswordChange}
               />
            </div>
          </fieldset>
          <div className="">
            <input
            onClick={this.onSubmitSignin}
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            type="submit"
            value="Log in"/>
          </div>
          <div>
          <p></p>
          </div>

          <input
          onClick={() => onRouteChange('info')}
          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
          type="submit"
          value="About This App"/>
        </div>
      </main>
      </article>
    );
  }
}


export default Signin;
