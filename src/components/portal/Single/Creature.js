import React from 'react';
import Interactive from 'react-interactive';
import { Link } from 'react-router';
import PageNotFound from '../../PageNotFound';
import API from '../../SpreadsheetData';
import s from '../../../styles/app.style';
import {observer, inject} from 'mobx-react';

@inject((stores, props, context) => props) @observer
export default class SingleCreature extends React.Component {

  // ** Process the tribe ** //
  // /portal/Creatures/{Tribe}/{Name}
  // /portal/{Tribe}/Creatures/{Name}
  // The first / gets counted
  render() {
    const store = API;

    let path = this.props.location.pathname.split("/");
    if (path[path.length-1] == "") path.pop(); // Remove trailing backslash

    // Path too long
    if ( path.length !== 5 ) {
      return(<PageNotFound location={this.props.location}/>);
    }

    //Handle both url layouts
    let tribe = (() => {
      if (path[2] === "Creatures") return path[3];
      if (path[3] === "Creatures") return path[2];
    })();

    let name = decodeURIComponent(path[4]);

    if (store.urls === null ||
      store.portal === null ||
      store.cards === null) {
      return (<span>Loading...</span>);
    }

    if (!store.urls.Creatures.hasOwnProperty(tribe)) {
      return (<span>Invalid Tribe: {tribe}</span>);
    }

    if (!store.cards.built.includes("creatures_Cards")) {
      store.cards.setupCreatures("Cards");
      return (<span>Loading...</span>);
    }

    if (!store.portal.built.includes("creatures_"+tribe)) {
      store.portal.setupCreatures(tribe);
      return (<span>Loading...</span>);
    }

    const creature = store.portal.creatures.findOne({'gsx$name': name});
    if (!creature) {
      return(<PageNotFound location={this.props.location}/>);
    }
    
    const card_data = store.cards.creatures.findOne({'gsx$name': name});

    const locations = creature.gsx$location.split(/[,]+\s*/).map((item, i) => {
      return <p key={i}><Interactive as={Link} {...s.link} to={"/portal/Locations/"+item}><span>{item}</span></Interactive></p>;
    });

    const battlegear = creature.gsx$battlegear.split(/[,]+\s*/).map((item, i) => {
      return <p key={i}><Interactive as={Link} {...s.link} to={"/portal/Battlegear/"+item}><span>{item}</span></Interactive></p>;
    });

    const elements = card_data.gsx$elements.split(/[ ,]+/).filter(Boolean).map((item, i) => {
      return <img className="icon" src={"/src/img/icons/elements/"+item.toLowerCase()+".png"} alt={item} key={i}></img>;
    });

    return (
      <div className={"creature " + tribe.toLowerCase()}>
        <h1>{creature.gsx$name}</h1>
        <img className="splash" src={store.base_image + creature.gsx$splash}></img>
        <hr />
        <div>
          <strong>Appearance:</strong><br />
          {creature.gsx$appearance}
        </div>
        <hr />
        <div>
          <strong>Background:</strong><br />
          {creature.gsx$background}
        </div>
        <hr />
        <div>
          <strong>Details:</strong><br />
          {creature.gsx$details}
        </div>
        <hr />
        <div>
          <strong>Favorite Battlegear(s):</strong><br />
          {battlegear}
        </div>
        <hr />
        <div>
          <strong>Favorite Location(s):</strong><br />
          {locations}
        </div>
        <hr />
        <div>
          <strong>Height (ft):</strong><br />
          {creature.gsx$height}
        </div>
        <hr />
        <div>
          <strong>Special Abilities:</strong><br />
          {creature.gsx$specialabilities}
        </div>
        <hr />
        <div>
          <strong>Weight (lb):</strong><br />
          {creature.gsx$weight}
        </div>
        <hr />
        <div>
          <strong>Special Abilities:</strong><br />
          {creature.gsx$specialabilities}
        </div>
        <hr />
        <div>
          <strong>Weight (lb):</strong><br />
          {creature.gsx$weight}
        </div>
        <hr />
        <div>
          <strong>Card ID: </strong>
          {card_data.gsx$cardid}
        </div>
        <hr />
        <div>
          <strong>Set: </strong>
          {card_data.gsx$set}
        </div>
        <hr />
        <div>
          <strong>Rarity: </strong>
          {card_data.gsx$rarity}
        </div>
        <hr />
        <div>
          <strong>Tribe: </strong>
          <img className="icon" src={"/src/img/icons/tribes/"+tribe.toLowerCase()+".png"}></img>{tribe}
        </div>
        <hr />
        <div>
          <strong>Ability:</strong><br />
          {card_data.gsx$ability}
        </div>
        <hr />
        <div>
          <strong>Courage: </strong>
          {card_data.gsx$courage}
        </div>
        <hr />
        <div>
          <strong>Power: </strong>
          {card_data.gsx$power}
        </div>
        <hr />
        <div>
          <strong>Speed: </strong>
          {card_data.gsx$speed}
        </div>
        <hr />
        <div>
          <strong>Wisdom: </strong>
          {card_data.gsx$wisdom}
        </div>
        <hr />
        <div>
          <strong>Elements: </strong>{elements}
        </div>
        <hr />
        <div>
          <strong>Energy: </strong>
          {card_data.gsx$energy}
        </div>
        <hr />
        <div>
          <strong>Flavortext:</strong><br />
          {card_data.gsx$flavortext}
        </div>
        <hr />
        <div>
          <strong>Mugic Ability: </strong>
          {card_data.gsx$mugicability}
        </div>
      </div>
    );
  }
}