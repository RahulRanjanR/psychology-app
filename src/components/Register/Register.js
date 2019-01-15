
import React from 'react';
import './Register.css';
import  SomeComponent from './SomeComponent';


const Register = ({onRouteChange}) => {
  return  (


    <article className="br3 shadow-5 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
        <main className="pa4 black-80">
      <div className="measure">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f1 fw6 ph0 mh0">Registration</legend>
          <input
          onClick={() => onRouteChange('quiz')}
          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
          type="submit"
          value="Retake The Test"
          />
          <div className="mt3">

            <label className="db fw6 lh-copy f6" htmlFor="name">Name/Discord</label>
            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
          </div>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
          </div>

          <div className="mt3">
          <label className="db fw6 lh-copy f6" htmlFor="">Choose Your Quiz Result </label>
            <select className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 cognitive'>
              <option value="" disabled selected>Cognitive Ego</option>
              <option value="mbti">Structure & Guardian : ESTJ</option>
              <option value="mbti">Structure & Artisan : ESTP</option>
              <option value="mbti">Structure & Intellectual : ENTJ</option>
              <option value="mbti">Structure & Idealist : ENFJ</option>
              <option value="mbti">Starter & Guardian : ESFJ</option>
              <option value="mbti">Starter & Artisan : ESFP</option>
              <option value="mbti">Starter & Intellectual : ENTP</option>
              <option value="mbti">Starter & Idealist : ENFP</option>
              <option value="mbti">Finisher & Guardian : ISTJ</option>
              <option value="mbti">Finisher & Artisan : ISTP</option>
              <option value="mbti">Finisher & Intellectual : INTJ</option>
              <option value="mbti">Finisher & Idealist : INFJ</option>
              <option value="mbti">Background & Guardian : ISFJ</option>
              <option value="mbti">Background & Artisan : ISFP</option>
              <option value="mbti">Background & Intellectual : INTP</option>
              <option value="mbti">Background & Idealist : INFP</option>
            </select>
            </div>
        </fieldset>
        <div className="">
          <input
          onClick={() => onRouteChange('home')}
          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
          type="submit"
          value="Join Our Group!"
          />
          <SomeComponent />
        </div>
      </div>
    </main>
    </article>
  );
}


export default Register;
