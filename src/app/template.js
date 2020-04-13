function getCheckbox(checked) {
  if (checked === true) {
    return [
      {
          type: 'polyline',
          lineWidth: 1,
          closePath: true,
          points: [{ x: 0, y: 0}, { x: 15, y: 0 }, { x: 15, y: 15 }, { x: 0, y:15 }]
      },              {
          type: 'polyline',
          lineWidth: 2,
          points: [{ x: 3, y: 3}, { x: 12, y: 12 }]
      },           
      {
          type: 'polyline',
          lineWidth: 2,
          points: [{ x: 12, y: 3}, { x: 3, y: 12 }]
      },
                  
    ];
  } else {
    return [
      {
          type: 'polyline',
          lineWidth: 1,
          closePath: true,
          points: [{ x: 0, y: 0}, { x: 15, y: 0 }, { x: 15, y: 15 }, { x: 0, y:15 }]
      },
    ];
  }
}

function getPDF(data, image) {
  let {firstname, lastname, birthdate, birthplace, address, zip, city, reasons, date, time, dateCreatedAt, timeCreatedAt, generatedText} = data;

  let dd = {
    content: [
      {
        text: 'ATTESTATION DE DÉPLACEMENT DÉROGATOIRE\n\n',
        style: 'header',
      },
      {
        text: '\u200B\t En application de l’article 3 du décret du 23 mars 2020 prescrivant les mesures générales nécessaires pour faire face à l’épidémie de Covid19 dans le cadre de l’état d’urgence sanitaire.\n\n',
        style: 'paragraph',
      },
      {
          text: 'Je soussigné(e),\n\n',
          style: 'paragraph',
      },		
      {
          text: 'Mme/M. : ' + firstname + ' ' + lastname + '\n\n',
          style: 'paragraph',
      },
      {
          text: 'Né(e) le : ' + birthdate + '\n\n',
          style: 'paragraph',
      },
      {
          text: 'À : ' + birthplace + '\n\n',
          style: 'paragraph',
      },
      {
          text: 'Demeurant : ' + address + ' ' + zip + ' ' + city + '\n\n',
          style: 'paragraph',
      },		
      {
          text: 'certifie que mon déplacement est lié au motif suivant (cocher la case) autorisé par l’article 3 du décret du 23 mars 2020 prescrivant les mesures générales nécessaires pour faire face à l’épidémie de Covid19 dans le cadre de l’état d’urgence sanitaire¹\n\n',
          style: 'paragraph',
      },
      {
        alignment: 'justify',
          columns: [
            {
              canvas: reasons.indexOf('travail') === -1 ? getCheckbox() : getCheckbox(true),
              style: 'checkbox',
              width: 'auto'
            },
            {
              text: 'Déplacements entre le domicile et le lieu d’exercice de l’activité professionnelle, lorsqu’ils sont indispensables à l’exercice d’activités ne pouvant être organisées sous forme de télétravail ou déplacements professionnels ne pouvant être différés².\n\n',
              style: 'paragraph',
            },
          ]
      },
      {
        alignment: 'justify',
          columns: [
            {
              canvas: reasons.indexOf('courses') === -1 ? getCheckbox() : getCheckbox(true),
              style: 'checkbox',
              width: 'auto'
            },
            {
              text: 'Déplacements pour effectuer des achats de fournitures nécessaires à l’activité professionnelle et des achats de première nécessité³ dans des établissements dont les activités demeurent autorisées (liste sur gouvernement.fr).\n\n',
              style: 'paragraph',
            },
          ]
      },
      {
        alignment: 'justify',
          columns: [
            {
              canvas: reasons.indexOf('sante') === -1 ? getCheckbox() : getCheckbox(true),
              style: 'checkbox',
              width: 'auto'
            },
            {
              text: 'Consultations et soins ne pouvant être assurés à distance et ne pouvant être différés ; consultations et soins des patients atteints d\'une affection de longue durée.\n\n',
              style: 'paragraph',
            },
          ]
      },
      {
        alignment: 'justify',
          columns: [
            {
              canvas: reasons.indexOf('famille') === -1 ? getCheckbox() : getCheckbox(true),
              style: 'checkbox',
              width: 'auto'
            },
            {
              text: 'Déplacements pour motif familial impérieux, pour l’assistance aux personnes vulnérables ou la garde d’enfants.\n\n',
              style: 'paragraph',
            },
          ]
      },
      {
        alignment: 'justify',
          columns: [
            {
              canvas: reasons.indexOf('sport') === -1 ? getCheckbox() : getCheckbox(true),
              style: 'checkbox',
              width: 'auto'
            },
            {
              text: 'Déplacements brefs, dans la limite d\'une heure quotidienne et dans un rayon maximal d\'un kilomètre autour du domicile, liés soit à l\'activité physique individuelle des personnes, à l\'exclusion de toute pratique sportive collective et de toute proximité avec d\'autres personnes, soit à la promenade avec les seules personnes regroupées dans un même domicile, soit aux besoins des animaux de compagnie.\n\n',
              style: 'paragraph',
            },
          ]
      },
      {
        alignment: 'justify',
          columns: [
            {
              canvas: reasons.indexOf('judiciaire') === -1 ? getCheckbox() : getCheckbox(true),
              style: 'checkbox',
              width: 'auto'
            },
            {
              text: 'Convocation judiciaire ou administrative.\n\n',
              style: 'paragraph',
            },
          ]
      },
      {
        alignment: 'justify',
          columns: [
            {
              canvas: reasons.indexOf('missions') === -1 ? getCheckbox() : getCheckbox(true),
              style: 'checkbox',
              width: 'auto'
            },
            {
              text: 'Participation à des missions d’intérêt général sur demande de l’autorité administrative.\n\n\n',
              style: 'paragraph',
            },
          ]
      },    
      
      {
          columns: [
              [
                  {
                      text: '\n Fait à : ' + city + '\n\n',
                      style: 'paragraph',
                  },                 
                  {
                      text: 'Le : ' + date + ' \u200B\t \u200B\t à \u200B\t ' + time + '\n',
                      style: 'paragraph',
                  },                 
                  {
                      text: '(Date et heure de début de sortie)\n\n',
                      style: 'paragraph',
                  },                
              ],
              [
                {
                  qr: generatedText,
                  fit: 120,
                  style: 'img',
                },
                {
                  text: 'Date de création:\n ' + dateCreatedAt + ' à ' + timeCreatedAt + '\n\n\n\n',
                  style: 'created',
                }
              ]
          ]
      },
      {
        text: '¹ Les personnes souhaitant bénéficier de l\'une de ces exceptions doivent se munir s\'il y a lieu, lors de leurs déplacements hors de leur domicile, d\'un document leur permettant de justifier  que le  déplacement  considéré entre dans  le champ de  l\'une de  ces  exceptions.',
        style: 'help',
    },    {
        text: '² A utiliser par les travailleurs non-salariés, lorsqu\'ils ne peuvent disposer d’un justificatif de déplacement établi par leur employeur.',
        style: 'help',
    },    {
        text: '³ Y compris les acquisitions à titre gratuit (distribution de denrées alimentaires…) et les déplacements liés à la perception de prestations sociales et au retrait d’espèces.',
        style: 'help',
    },
    {
      qr: generatedText, 
      pageBreak: 'before',
      style: 'qrcode'
    },
    // {
    //   image: image, 
    //   pageBreak: 'before',
    //   style: 'qrcode'
    // },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        alignment: 'center'
      },
      paragraph: {
        fontSize: 10,
        bold: false,
          },
          checkbox: {
              marginRight: 15
          },
          help: {
              fontSize: 8,
          },
          created: {
            fontSize: 6,
            alignment: 'right',
            // marginTop: -10,
          },
          img: {
            // marginRight: -10,
            width: '25%',
            alignment: 'right'
          },
          qrcode: {
            width: '60%' 
          },
    }
  }

  return dd;
}

export default getPDF;