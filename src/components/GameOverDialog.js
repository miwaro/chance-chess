import PropTypes from 'prop-types';
import { DialogTitle, DialogActions, DialogContent, DialogContentText, Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';

export default function GameOverDialog(props) {
  const { url, open, message, newGame } = props;

  const startNewGame = () => {
    newGame()
  }

  return (
    <Dialog aria-labelledby="Start-dialog-title" open={open}>
      <DialogTitle id="Start-dialog-title" style={{ margin: 'auto', marginBottom: 0, paddingBottom: 0, fontSize: '32px' }}>
        {message}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Click the button below to start a new game.
        </DialogContentText>
        <DialogActions>
          <Button color="primary" onClick={() => { startNewGame() }}>
            Click Here to Start a New Game
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

GameOverDialog.propTypes = {
  url: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired
};
