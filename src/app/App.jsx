import React from 'react';
import Form from './Form';

function App() {
  return (
    <div>
      <h1 className="header">COVID-19: Attestation de Sortie</h1>
      <div className="app">
        <p>
          Les données saisies sont stockées exclusivement sur votre téléphone ou votre ordinateur. 
          Aucune information n'est collectée par le Ministère de l'Intérieur. 
          L'attestation pdf générée contient un QR Code. 
          Ce code-barres graphique permet de lire les informations portées dans votre attestation au moment de leur saisie. 
          Il peut être déchiffré à l'aide de tout type de lecteur de QR code générique.
        </p>
        <Form />
      </div>
    </div>
  );
}

export default App;
