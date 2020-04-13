import React, {Component} from 'react';
import Form from './Form';
import dataFr from '../assets/data/fr';
import dataEus from '../assets/data/eus';
import ikurrina from '../assets/img/ikurrina.svg';
import tricolor from '../assets/img/tricolor.svg';

class App extends Component {
  state = {
    data: dataFr,
  };

  onClickLang = (e, lang) => {
    e.preventDefault();

    switch (lang) {
      case 'eus':
        this.setState({data: dataEus});
        break;

      case 'fr':
        this.setState({data: dataFr});
        break;

      default:
        this.setState({data: dataFr});
    }

    return this.state;
  }

  render(){
    let {header, intro_1, intro_2, intro_2_link, intro_3, intro_3_link} = this.state.data;
    
    return (
      <div>
        <h1 className="header">{header}</h1>
        <div className="app">
          <div className="lang">
            <div className="flex-row flags">
              <img
                src={tricolor}
                width="25"
                height="15"
                onClick={(e) => this.onClickLang(e, 'fr')}
                alt="français" 
              />
              <img
                src={ikurrina}
                width="30"
                height="15"
                onClick={(e) => this.onClickLang(e, 'eus')}
                alt="euskara" 
              />
            </div>
          </div>

          <div className="intro">
            <p className="bold">
              {intro_1}
            </p>
            <p>
              {intro_2}
              <a href={intro_2_link} target="_blank" rel="noopener noreferrer">
                {intro_2_link}
              </a>
            </p>
            <p>
              {intro_3}
              <a href={intro_3_link} target="_blank" rel="noopener noreferrer">
                {intro_3_link}
              </a>
            </p>
          </div>

          <Form data={this.state.data} />
        </div>
      </div>
    );
  }
}

export default App;
