import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
  checkbox: {
    marginBottom: 16,
  },
};


const tilesData = [
  {
    img: 'https://static1.squarespace.com/static/51e6e1c8e4b018cade39dd2d/t/5239c299e4b0dd764d7743f7/1379517082863/bar-services-hero.jpg',
    title: 'Drinks'
  },
  {
    img: 'https://usercontent2.hubstatic.com/12089443_f496.jpg',
    title: 'Food'
  },
  {
    img: 'http://www.kaylainthecity.com/wp-content/uploads/gym.jpg',
    title: 'Gym'
  },
  {
    img: 'http://az616578.vo.msecnd.net/files/2015/06/08/635693880042525992-518822648_couple-hiking-valley.jpg',
    title: 'Outdoors'
  },
  {
    img: 'https://s-media-cache-ak0.pinimg.com/originals/94/91/be/9491be93bd39554e24def0ec1530b68f.jpg',
    title: 'Sports'
  },
];

class ScheduleGrid extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.root}>
        <GridList style={styles.gridList} cols={2.2}>
          <GridTile
            key={tilesData[0].img}
            title={tilesData[0].title}
            actionIcon={
              <Checkbox
                style={styles.checkbox}
                onCheck={this.props.onCategorySelect.onSelectDrinks}
              />
            }
            titleStyle={styles.titleStyle}
            titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          >
            <img src={tilesData[0].img} />
          </GridTile>

          <GridTile
            key={tilesData[1].img}
            title={tilesData[1].title}
            actionIcon={
              <Checkbox
                style={styles.checkbox}
                onCheck={this.props.onCategorySelect.onSelectFood}
              />
            }
            titleStyle={styles.titleStyle}
            titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          >
            <img src={tilesData[1].img} />
          </GridTile>

          <GridTile
            key={tilesData[2].img}
            title={tilesData[2].title}
            actionIcon={
              <Checkbox
                style={styles.checkbox}
                onCheck={this.props.onCategorySelect.onSelectGym}
              />
            }
            titleStyle={styles.titleStyle}
            titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          >
            <img src={tilesData[2].img} />
          </GridTile>

          <GridTile
            key={tilesData[3].img}
            title={tilesData[3].title}
            actionIcon={
              <Checkbox
                style={styles.checkbox}
                onCheck={this.props.onCategorySelect.onSelectOutdoors}
              />
            }
            titleStyle={styles.titleStyle}
            titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          >
            <img src={tilesData[3].img} />
          </GridTile>

          <GridTile
            key={tilesData[4].img}
            title={tilesData[4].title}
            actionIcon={
              <Checkbox
                style={styles.checkbox}
                onCheck={this.props.onCategorySelect.onSelectSports}
              />
            }
            titleStyle={styles.titleStyle}
            titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          >
            <img src={tilesData[4].img} />
          </GridTile>

        </GridList>
      </div>
    )
  }
};

export default ScheduleGrid;





