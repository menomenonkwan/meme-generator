import React from 'react';

class MemeGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      topText: '',
      bottomText: '',
      randomImg: 'http://i.imgflip.com/1bij.jpg',
      allMemeImgs: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    })
  }

  handleClick(e) {
    e.preventDefault();
    const randomNumber = Math.floor(Math.random() * this.state.allMemeImgs.length);
    const newRandomImg = this.state.allMemeImgs[randomNumber].url;
    this.setState({
      randomImg: newRandomImg
    })
  }

  componentDidMount() {
    fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(response => {
        const { memes } = response.data;
        console.log(memes[0])
        this.setState({
          isLoaded: true,
          allMemeImgs: memes
        });
      },
      (error) => console.log(error));
  }


  render() {
    return ( 
      <div>
        <form className="meme-form">
          <label htmlFor="topText">Top Text</label>
          <input 
            name="topText" 
            type="text" 
            value={this.state.topText}
            onChange={this.handleChange}
          />
          <label htmlFor="bottomText">Bottom Text</label>
          <input 
            name="bottomText" 
            type="text" 
            value={this.state.bottomText}
            onChange={this.handleChange}
          />
          <button onClick={this.handleClick}>Generate</button>
        </form>

        <div className="meme">
          <img src={this.state.randomImg} alt="" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}
 
export default MemeGenerator;