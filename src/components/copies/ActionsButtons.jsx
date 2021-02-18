import PropTypes from "prop-types";

const ActionsButtons = (props) => {
  return (
    <>
      <div>
        <button onClick={() => props.dealOneCard()}>Draw Card</button>
        <button onClick={() => props.dealOneCard()}>Select</button>

      </div>
    </>
  );
};

ActionsButtons.propTypes = {
  dealOneCard: PropTypes.func,
};

export default ActionsButtons;
