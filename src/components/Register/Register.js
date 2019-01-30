
import React from 'react';
import './Register.css';
import { ColoredLine } from '../../containers/QuizPage';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password : '',
      name: '',
      mbti: '',
      showPopup: false
    }
  }

// checking before setting up a new user and allowing the popup to show
onSubmitSignin = () => {
    fetch('http://localhost:3000/register',{
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
      if (user.id){
        console.log('ayyee');
        console.log(this.state.showPopup);
         return this.setState({showPopup: true})
         setTimeout(this.props.onRouteChange, 3000, 'signin')

      }
    })

    }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
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


  render() {
    const { onRouteChange } = this.props;

    return  (
      <article className="br3 shadow-5 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
          <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0 ">Registration</legend>
            <div>
            <ColoredLine color="black" />

            <input
            onClick={() => onRouteChange('info')}
            className="b ph3 pv2 input-reset ba b--black calming-text-field grow pointer f6 dib"
            type="submit"
            value="About This App"/>
          </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">Name/Discord</label>
              <input
                className="pa2 input-reset ba calming-text-field hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                onChange={this.onNameChange}
                 />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input
                className="pa2 input-reset ba calming-text-field hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={this.onEmailChange}
               />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input
                className="b pa2 input-reset ba calming-text-field hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={this.onPasswordChange}
                  />

                  </div>
            <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="">Choose Your Type Result </label>
              <select required
              className='b pa2 input-reset ba calming-text-field hover-bg-calming-text-field hover-black-text-field w-100 cognitive'
              onChange={this.onMbtiChange}
              >
                <option value="" defaultValue disabled hidden>Please select your cognitive ego</option>
                <option onChange={this.onMbtiChange} value="ESTJ">Structure & Guardian : ESTJ</option>

                <option onChange={this.onMbtiChange} value="ESTP">Structure & Artisan : ESTP</option>

                <option onChange={this.onMbtiChange} value="ENTJ">Structure & Intellectual : ENTJ</option>

                <option onChange={this.onMbtiChange} value="ENFJ">Structure & Idealist : ENFJ</option>

                <option onChange={this.onMbtiChange} value="ESFJ">Starter & Guardian : ESFJ</option>

                <option onChange={this.onMbtiChange} value="ESFP">Starter & Artisan : ESFP</option>

                <option onChange={this.onMbtiChange} value="ENTP">Starter & Intellectual : ENTP</option>

                <option onChange={this.onMbtiChange} value="ENFP">Starter & Idealist : ENFP</option>

                <option onChange={this.onMbtiChange} value="ISTJ">Finisher & Guardian : ISTJ</option>

                <option onChange={this.onMbtiChange} value="ISTP">Finisher & Artisan : ISTP</option>

                <option onChange={this.onMbtiChange} value="INTJ">Finisher & Intellectual : INTJ</option>

                <option onChange={this.onMbtiChange} value="INFJ">Finisher & Idealist : INFJ</option>

                <option onChange={this.onMbtiChange} value="ISFJ">Background & Guardian : ISFJ</option>

                <option onChange={this.onMbtiChange} value="ISFP">Background & Artisan : ISFP</option>

                <option onChange={this.onMbtiChange} value="INTP">Background & Intellectual : INTP</option>

                <option onChange={this.onMbtiChange} value="INFP">Background & Idealist : INFP</option>

              </select>
              <p></p>
              </div>
          </fieldset>
          <div className="">
          <button onClick={this.onSubmitSignin} >Join the Community</button>
          {this.state.showPopup ?
            <div className='popup'>
             <div className="popup_inner br3 shadow-5 ba b--black-10 mv4 center">
              <button className=' br3 w-100 w-50-m w-25-l mw6 center calming-text-field' onClick={this.onSubmitSignin}>You're Registered!</button>
             </div>
            </div>
            : null
          }

          </div>
        </div>
      </main>
      </article>
    );
  }
}




// Enter some pieces into the popup !
/*  <div className="">
    <input
    onClick={this.onSubmitSignin}
    className="b ph3 pv2 input-reset ba b--black calming-text-field grow pointer f6 dib"
    type="submit"
    value="Join Our Group!"
    />
  </div>
*/



export default Register;
