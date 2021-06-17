import PropTypes from 'prop-types';
import { DialogTitle, DialogActions, DialogContent, DialogContentText, Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';

export default function StartDialog(props) {
  const { url, open } = props;

  return (
    <Dialog aria-labelledby="Start-dialog-title" open={open}>
      <DialogTitle id="Start-dialog-title" style={{ margin: 'auto', marginBottom: 0, paddingBottom: 0, fontSize: '32px' }}>Invite a Friend</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Click the button below to copy a link to this game. The match will start once your opponent joins.
        </DialogContentText>
        <DialogActions>
          <Button color="primary" onClick={() => {navigator.clipboard.writeText(url)}}>
            Click Here to Copy Link to Game
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

StartDialog.propTypes = {
  url: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired
};
