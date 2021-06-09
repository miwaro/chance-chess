import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function StartDialog(props) {
  const { url, open } = props;

  return (
    <Dialog aria-labelledby="Start-dialog-title" open={open}>
      <DialogTitle id="Start-dialog-title">Invite a Friend</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {url}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

StartDialog.propTypes = {
  url: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired
};
