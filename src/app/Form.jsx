import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
import { DateTime } from 'luxon';
import QRCode from 'qrcode.react';

DateTime.local();

class CovidForm extends Component {
  constructor(props) {
    super(props)
    this.state= {
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
    };
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

  onSubmit = (e) => {
    e.preventDefault();

    return this.getDateFormat()
      .then(() => {
        console.log('state', this.state);
        
        let regex = /,/gi;
        let reasons = this.state.reasons.toString().replace(regex, ', ');
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

  generatePDF = () => {
    console.log('generated text:', this.state.generatedText);
    this.setState({isGenerated: true});
  }

  renderForm = () => {
    let travail = 'Déplacements entre le domicile et le lieu d’exercice de l’activité professionnelle, lorsqu\'ils sont indispensables à l\'exercice d’activités ne pouvant être organisées sous forme de télétravail ou déplacements professionnels ne pouvant être différés.';
    let courses = 'Déplacements pour effectuer des achats de fournitures nécessaires à l’activité professionnelle et des achats de première nécessité dans des établissements dont les activités demeurent autorisées (liste sur gouvernement.fr).';
    let sante = 'Consultations et soins ne pouvant être assurés à distance et ne pouvant être différés ; consultations et soins des patients atteints d\'une affection de longue durée.';
    let sport = 'Déplacements brefs, dans la limite d\'une heure quotidienne et dans un rayon maximal d\'un kilomètre autour du domicile, liés soit à l\'activité physique individuelle des personnes, à l\'exclusion de toute pratique sportive collective et de toute proximité avec d\'autres personnes, soit à la promenade avec les seules personnes regroupées dans un même domicile, soit aux besoins des animaux de compagnie.';
    let famille = 'Déplacements pour motif familial impérieux, pour l’assistance aux personnes vulnérables ou la garde d’enfants.';
    let convocation = 'Convocation judiciaire ou administrative.';
    let tig = 'Participation à des missions d’intérêt général sur demande de l’autorité administrative.';

    return (
      <Form className="app">
        <h1 className="title">Remplissez en ligne votre attestation numérique :</h1>
        <FormGroup>
          <Label for="firstname">Prénom</Label>
          <Input
            id="firstname"
            type="text"
            name="firstname"
            placeholder="Jean"
            value={this.state.firstname}
            onChange={this.onChange}
          />
        </FormGroup>
  
        <FormGroup>
          <Label for="lastname">Nom</Label>
          <Input
            id="lastname"
            type="text"
            name="lastname"
            placeholder="Dupont"
            value={this.state.lastname}
            onChange={this.onChange}
          />
        </FormGroup>
  
        <FormGroup>
          <Label for="birthdate">Date de naissance</Label>
          <Input
            id="birthdate"
            type="date"
            name="birthdate"
            value={this.state.birthdate}
            onChange={this.onChange}
          />
        </FormGroup>
  
        <FormGroup>
          <Label for="birthplace">Lieu de naissance</Label>
          <Input
            id="birthplace"
            type="text"
            name="birthplace"
            placeholder="Lyon"
            value={this.state.birthplace}
            onChange={this.onChange}
          />
        </FormGroup>
  
        <FormGroup>
          <Label for="address">Adresse</Label>
          <Input
            id="address"
            type="text"
            name="address"
            placeholder="999 avenue de france"
            value={this.state.address}
            onChange={this.onChange}
          />
        </FormGroup>
  
        <FormGroup>
          <Label for="city">Ville</Label>
          <Input
            id="city"
            type="text"
            name="city"
            placeholder="Paris"
            value={this.state.city}
            onChange={this.onChange}
          />
        </FormGroup>
  
        <FormGroup>
          <Label for="zip">Code Postal</Label>
          <Input
            id="zip"
            type="text"
            name="zip"
            placeholder="75001"
            value={this.state.zip}
            onChange={this.onChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="reason" className="title">Choisissez un motif de sortie</Label>
          <div>
            <CustomInput
              type="checkbox"
              id="reason1"
              className="checkbox"
              name="travail"
              label={travail}
              onChange={this.onCheck}
            />
            <CustomInput 
              type="checkbox" 
              id="reason2" 
              className="checkbox" 
              name="courses" 
              label={courses}
              onChange={this.onCheck} 
            />
            <CustomInput type="checkbox" 
              id="reason3" 
              className="checkbox" 
              name="sante" 
              label={sante} 
              onChange={this.onCheck} 
            />
            <CustomInput type="checkbox" 
              id="reason4" 
              className="checkbox" 
              name="famille" 
              label={famille} 
              onChange={this.onCheck} 
            />
            <CustomInput type="checkbox" 
              id="reason5" 
              className="checkbox" 
              name="sport" 
              label={sport} 
              onChange={this.onCheck}
            />
            <CustomInput type="checkbox" 
              id="reason6" 
              className="checkbox" 
              name="convocation" 
              label={convocation} 
              onChange={this.onCheck} 
            />
            <CustomInput type="checkbox" 
              id="reason7" 
              className="checkbox" 
              name="tig" 
              label={tig} 
              onChange={this.onCheck} 
            />
          </div>
        </FormGroup>
  
        <h2 className="title">Sortie</h2>
        <FormGroup>
          <Label for="date">Date de sortie</Label>
          <Input
            id="date"
            type="date"
            name="date"
            value={this.state.date}
            onChange={this.onChange}
          />
        </FormGroup>
  
        <FormGroup>
          <Label for="time">Heure de sortie</Label>
          <Input
            id="time"
            type="time"
            name="time"
            value={this.state.time}
            onChange={this.onChange}
          />
        </FormGroup>
  
        <Button onClick={this.onSubmit} className="button" block>Générer attestation</Button>
      </Form>
    );
  }

  renderQRCode = () => {
    return (
      <QRCode value={this.state.generatedText} />
    );
  }

  render() {    
    return this.state.isGenerated ? this.renderQRCode() : this.renderForm()
  }
}

export default CovidForm;
