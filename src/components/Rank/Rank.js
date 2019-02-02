import React from 'react';

class Rank extends React.Component{
  constructor(){
    super();
    this.state = {
      emoji: ''
    }
  }

  componentDidMount() {
    this.generateEmoji(this.props.entries)
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.entries === this.props.entries && prevProps.name === this.props.name) {
      return null
    }
    this.generateEmoji(this.props.entries);
  }

  generateEmoji = (entries) => {
    fetch(`https://sg3bbrk0o1.execute-api.us-east-1.amazonaws.com/prod/rank?rank=${entries}`)
    .then(response => response.json())
    .then(data => this.setState({ emoji: data.input }))
    .catch(console.log)
  }
render() {
  return  (
    <div>
        <div className='white f3'>
          {`${this.props.name}, your current entry count is.. ${this.props.entries}`}
          <div className='white f3'>
            {`${this.state.emoji}` }
          </div>
      </div>

    </div>
    );
  }
}

export default Rank;
