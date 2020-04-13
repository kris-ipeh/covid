import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
import { DateTime } from 'luxon';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import AwesomeQR from 'react-awesome-qr';
import getPDF from './template';
let ikurrina = require('../assets/img/ikurrina.svg');

DateTime.local();
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class CovidForm extends Component {
  constructor(props) {
    super(props);

    this.qrRef = React.createRef();

    this.state = {
      data: this.props.data,
      isGenerated: false,
      dateCreatedAt: null,
      timeCreatedAt: null,
      firstname: '',
      lastname: '',
      birthdate: '',
      birthplace: '',
      address: '',
      city: '',
      zip: '',
      date: '',
      time: '',
      reasons: [],
      generatedText: '',
      // isCustom: null,
      // customBg: null,
      // customQR: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.setState({data: this.props.data});
      return this.state;
    }
  }

  componentWillUnmount() {
    this.setState({
      isGenerated: false,
      dateCreatedAt: null,
      timeCreatedAt: null,
      firstname: '',
      lastname: '',
      birthdate: '',
      birthplace: '',
      address: '',
      city: '',
      zip: '',
      date: '',
      time: '',
      reasons: [],
      generatedText: '',
      // isCustom: null,
      // customBg: null,
    });
  }

  onChange = (e) => {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onCheck = (e) => {
    let reasons = this.state.reasons;

    if (reasons.indexOf(e.target.name) !== -1) {
      reasons.splice(reasons.indexOf(e.target.name), 1);
    } else {
      reasons.push(e.target.name)
    }

    this.setState({ reasons });
  }

  // onChangeCustom = (e, val) => {    
  //   this.setState({
  //     isCustom: val
  //   })
  // }

  onSubmit = (e) => {
    e.preventDefault();

    return this.getDateFormat()
      .then(() => {        
        let reasons = this.state.reasons.toString().replace(/,/gi , '-');
        let generatedText = `Cree le: ${this.state.dateCreatedAt} a ${this.state.timeCreatedAt}; Nom: ${this.state.lastname}; Prenom: ${this.state.firstname}; Naissance: ${this.state.birthdate} a ${this.state.birthplace}; Adresse: ${this.state.address} ${this.state.zip} ${this.state.city}; Sortie: ${this.state.date} a ${this.state.time}; Motifs: ${reasons}`;
    
        this.setState({generatedText});
        return this.generatePDF();
      })
      .catch((err) => {
        console.log('error', err);
      })
    ;
  }

  getDateFormat = () => {
    let that = this;

    return new Promise(function(resolve, reject) {
      let birthdate = that.state.birthdate.split('-')[2] + '/' + that.state.birthdate.split('-')[1] + '/' + that.state.birthdate.split('-')[0];
      let date = that.state.date.split('-')[2] + '/' + that.state.date.split('-')[1] + '/' + that.state.date.split('-')[0];
      let dateCreatedAt = DateTime.local().toFormat('dd/LL/yyyy');
      let timeCreatedAt = DateTime.local().toFormat('HH:mm');
  
      resolve(that.setState({
        birthdate,
        date,
        dateCreatedAt,
        timeCreatedAt,
      }));
    })
  }

  generatePDF = (image) => {
    pdfMake.createPdf(getPDF(this.state)).download();
    // pdfMake.createPdf(getPDF(this.state), image).open();

    this.setState({isGenerated: true});   
  }

  renderForm = () => {
    return (
      <Form className="app">
        <h1 className="title">{this.state.data.idTitle}</h1>
        <FormGroup>
          <Label for="firstname">{this.state.data.firstname}</Label>
          <Input
            id="firstname"
            type="text"
            name="firstname"
            placeholder="Jean"
            value={this.state.firstname}
            onChange={this.onChange}
            required
          />
        </FormGroup>
  
        <FormGroup>
          <Label for="lastname">{this.state.data.lastname}</Label>
          <Input
            id="lastname"
            type="text"
            name="lastname"
            placeholder="Dupont"
            value={this.state.lastname}
            onChange={this.onChange}
            required
          />
        </FormGroup>
  
        <FormGroup>
          <Label for="birthdate">{this.state.data.birthdate}</Label>
          <Input
            id="birthdate"
            type="date"
            name="birthdate"
            value={this.state.birthdate}
            onChange={this.onChange}
            required
          />
        </FormGroup>
  
        <FormGroup>
          <Label for="birthplace">{this.state.data.birthplace}</Label>
          <Input
            id="birthplace"
            type="text"
            name="birthplace"
            placeholder="Lyon"
            value={this.state.birthplace}
            onChange={this.onChange}
            required
          />
        </FormGroup>
  
        <FormGroup>
          <Label for="address">{this.state.data.address}</Label>
          <Input
            id="address"
            type="text"
            name="address"
            placeholder="999 avenue de france"
            value={this.state.address}
            onChange={this.onChange}
            required
          />
        </FormGroup>
  
        <FormGroup>
          <Label for="city">{this.state.data.city}</Label>
          <Input
            id="city"
            type="text"
            name="city"
            placeholder="Paris"
            value={this.state.city}
            onChange={this.onChange}
            required
          />
        </FormGroup>
  
        <FormGroup>
          <Label for="zip">{this.state.data.zip}</Label>
          <Input
            id="zip"
            type="number"
            name="zip"
            placeholder="75001"
            value={this.state.zip}
            onChange={this.onChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="reason" className="title">{this.state.data.reasonTitle}</Label>
          <div>
            <CustomInput
              type="checkbox"
              id="reason1"
              className="checkbox"
              name="travail"
              label={this.state.data.work}
              onChange={this.onCheck}
            />
            <CustomInput 
              type="checkbox" 
              id="reason2" 
              className="checkbox" 
              name="courses" 
              label={this.state.data.shopping}
              onChange={this.onCheck} 
            />
            <CustomInput type="checkbox" 
              id="reason3" 
              className="checkbox" 
              name="sante" 
              label={this.state.data.health} 
              onChange={this.onCheck} 
            />
            <CustomInput type="checkbox" 
              id="reason4" 
              className="checkbox" 
              name="famille" 
              label={this.state.data.family} 
              onChange={this.onCheck} 
            />
            <CustomInput type="checkbox" 
              id="reason5" 
              className="checkbox" 
              name="sport" 
              label={this.state.data.sport} 
              onChange={this.onCheck}
            />
            <CustomInput type="checkbox" 
              id="reason6" 
              className="checkbox" 
              name="judiciaire" 
              label={this.state.data.justice} 
              onChange={this.onCheck} 
            />
            <CustomInput type="checkbox" 
              id="reason7" 
              className="checkbox" 
              name="missions" 
              label={this.state.data.mission} 
              onChange={this.onCheck} 
            />
          </div>
        </FormGroup>
  
        <h2 className="title">{this.state.data.DateTitle}</h2>
        <FormGroup>
          <Label for="date">{this.state.data.date}</Label>
          <Input
            id="date"
            type="date"
            name="date"
            value={this.state.date}
            onChange={this.onChange}
            required
          />
        </FormGroup>
  
        <FormGroup>
          <Label for="time">{this.state.data.time}</Label>
          <Input
            id="time"
            type="time"
            name="time"
            value={this.state.time}
            onChange={this.onChange}
            required
          />
        </FormGroup>
  
        {/* <FormGroup tag="fieldset">
          <legend className="title">{this.state.data.customTitle}</legend>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="isCustom" value={false} onChange={(e) => this.onChangeCustom(e, false)} />{' '}
              {this.state.data.official}
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="isCustom" value={true} onChange={(e) => this.onChangeCustom(e, true)} />{' '}
              {this.state.data.alternative}
            </Label>
          </FormGroup>
        </FormGroup> */}
  
        <Button onClick={this.onSubmit} className="button" block>{this.state.data.button}</Button>
        <div ref={this.myRef} />
      </Form>
    );
  }

  renderQRCode = () => {
    return (
      <AwesomeQR text={this.state.generatedText} size={300} dotScale={0.5} bgSrc={ikurrina} />
    );
  }

  render() {     
    return this.state.isGenerated ? this.renderQRCode() : this.renderForm()
  }
}

export default CovidForm;