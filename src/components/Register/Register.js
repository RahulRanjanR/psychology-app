
import React from 'react';
import './Register.css';


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password : '',
      name: '',
      mbti: ''
    }
  }
  // when change occurs in the field, the state is equal to that input form the user
  onNameChange = (event) => {
    this.setState({name: event.target.value })
  }
  onEmailChange = (event) => {
    this.setState({email: event.target.value })
  }
  onPasswordChange = (event) => {
    this.setState({password: event.target.value })
  }
  onMbtiChange = (event) => {
    this.setState({mbti: event.target.value })
  }
  onSubmitSignin = () => {
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
        mbti: this.state.mbti
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user){
        this.props.loadUser(user)
        this.props.onRouteChange('home')
      }
    })
    }

  render() {
    return  (
      <article className="br3 shadow-5 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
          <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Registration</legend>
            <input
            onClick={() => this.onRouteChange('info')}
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            type="submit"
            value="Retake The Quiz"
            />
            <div className="mt3">

              <label className="db fw6 lh-copy f6" htmlFor="name">Name/Discord</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                onChange={this.onNameChange}
                 />
            </div>
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
            <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="">Choose Your Type Result </label>
              <select
              className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 cognitive'
              onChange={this.onMbtiChange}
              >
                <option value="BLANK" defaultValue>Cognitive Ego</option>
                <option value="ESTJ">Structure & Guardian : ESTJ</option>
                <option value="ESTP">Structure & Artisan : ESTP</option>
                <option value="ENTJ">Structure & Intellectual : ENTJ</option>
                <option value="ENFJ">Structure & Idealist : ENFJ</option>
                <option value="ESFJ">Starter & Guardian : ESFJ</option>
                <option value="ESFP">Starter & Artisan : ESFP</option>
                <option value="ENTP">Starter & Intellectual : ENTP</option>
                <option value="ENFP">Starter & Idealist : ENFP</option>
                <option value="ISTJ">Finisher & Guardian : ISTJ</option>
                <option value="ISTP">Finisher & Artisan : ISTP</option>
                <option value="INTJ">Finisher & Intellectual : INTJ</option>
                <option value="INFJ">Finisher & Idealist : INFJ</option>
                <option value="ISFJ">Background & Guardian : ISFJ</option>
                <option value="ISFP">Background & Artisan : ISFP</option>
                <option value="INTP">Background & Intellectual : INTP</option>
                <option value="INFP">Background & Idealist : INFP</option>
              </select>
              <p></p>
              </div>
          </fieldset>
          <div className="">
            <input
            onClick={this.onSubmitSignin}
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            type="submit"
            value="Join Our Group!"
            />
          </div>
        </div>
      </main>
      </article>
    );
  }
}




export default Register;
