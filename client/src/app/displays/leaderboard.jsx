import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

const Leaderboard = (props) => {
  return(
    <TableRow>
      <TableRowColumn><Chip style={styles}>
          <Avatar src="https://s3.amazonaws.com/uifaces/faces/twitter/rogie/48.jpg" />
        {props.userz.rank}</Chip>
      </TableRowColumn>
      <TableRowColumn><Chip style={styles}>
          <Avatar src="https://s3.amazonaws.com/uifaces/faces/twitter/rogie/48.jpg" />
        {props.userz.username}</Chip>
      </TableRowColumn>
    </TableRow>
  )
};

export {Leaderboard}