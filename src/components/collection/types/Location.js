import React from 'react';
import Interactive from 'react-interactive';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import {observable} from "mobx";
import {observer, inject} from 'mobx-react';
import {Rarity, Unique, Name, Ability} from '../Snippets';

@inject((stores, props, context) => props) @observer
export default class Location extends React.Component {

  render() {
    let location = this.props.location;

    return(
      <div className="card">
        <img className="thumb" style={{float: 'left', width: '100px', height: '98px'}} src={API.base_image + (location.gsx$thumb||API.thumb_missing)} onClick={() => this.props.setImage(location.gsx$image)} />
        <div className="left">
          <Name name={location.gsx$name} /><br />
          <Rarity set={location.gsx$set} rarity={location.gsx$rarity} /><br />
          <Initiative initiative={location.gsx$initiative} /><br />
        </div>
        <div className="right">
          <Ability ability={location.gsx$ability} />
          <span className="flavortext">{location.gsx$flavortext}</span>
        </div>
      </div>
    );
  }
}

function Initiative(props) {
  let initiative = props.initiative;
  let image = null;
  if (["Danian", "Generic", "Mipedian", "OverWorld", "UnderWorld", "M'arrillian"].indexOf(initiative) > -1) {
    image = <img className="icon16" style={{verticalAlign: 'middle'}} src={("/src/img/icons/tribes/"+initiative+".png").toLowerCase()} />
  }
  else if (["courage", "power", "speed", "wisdom"].indexOf(initiative.toLowerCase()) > -1){
    image = <img className="icon16" style={{verticalAlign: 'middle'}} src={("/src/img/icons/disciplines/"+initiative+".png").toLowerCase()} />
  }
  else if (["fire", "air", "earth", "water"].indexOf(initiative.toLowerCase()) > -1){
    image = <img className="icon16" style={{verticalAlign: 'middle'}} src={("/src/img/icons/elements/"+initiative+".png").toLowerCase()} />
  }
  else if (initiative.toLowerCase() == "mugic counter") {
    image = <img className="icon16" style={{verticalAlign: 'middle'}} src={("/src/img/icons/mugic/generic.png").toLowerCase()} />
  }
  return (<span>Initiative: {image} {initiative}</span>);
}