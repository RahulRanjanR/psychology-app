import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';



class ProfileIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
  }


  removeAuthTokenInSessions = (token) => {
    window.sessionStorage.removeItem('token');
  }


  onProfileUpdate = (data) => {
    fetch(`https://warm-woodland-74542.herokuapp.com/profile/${this.props.user.id}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.sessionStorage.getItem('token')
      },
      body: JSON.stringify({
        formInput: data
      })
    }).then(resp => {
      if (resp.status === 200 || resp.status === 304) {
        this.removeAuthTokenInSessions(this.token);
        this.props.loadUser({ ...this.props.user, ...data });
        console.log(this.token);
      }
    }).catch(console.log)
  }




  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  signingOut = ({token}) => {
    this.removeAuthTokenInSessions(this.props.token);
    console.log("signing out");
    this.props.onRouteChange('signout');
    }


  render() {
    return (
      <div className="pa4 tc">
            <Dropdown isOpen={this.state.dropdownOpen}  toggle={this.toggle}>
              <DropdownToggle
                tag="span"
                onClick={this.toggle}
                data-toggle="dropdown"
                aria-expanded={this.state.dropdownOpen}
              >
                <img
                  src={`https://robohash.org/${this.props.id}?set=set2`}
                  className="br-100 ba bw1 h3 w3 dib" alt="avatar" />
              </DropdownToggle>
              <DropdownMenu className='b--transparent shadow-5' style={{marginTop: '20px', backgroundColor: 'rgba(123, 200, 255, 0.5)'}} right>
                <DropdownItem onClick={() => this.props.toggleModal()}>View Profile</DropdownItem>
                <DropdownItem onClick={this.signingOut}>Sign Out</DropdownItem>
              </DropdownMenu>
            </Dropdown>
      </div>
    );
  }
}

export default ProfileIcon;
