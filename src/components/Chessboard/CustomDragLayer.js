import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';

import { renderChessPiece } from './Piece';

class CustomDragLayer extends Component {
  static propTypes = {
    item: PropTypes.object,
    currentOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    isDragging: PropTypes.bool.isRequired,
    width: PropTypes.number,
    pieces: PropTypes.object,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    wasPieceTouched: PropTypes.bool,
    sourceSquare: PropTypes.string
  };

  state = {
    hoveredSquare: ''
  }

  componentDidUpdate() {
    if (this.props.hoveredSquare !== this.state.hoveredSquare) {
      this.setState({ hoveredSquare: this.props.hoveredSquare })
    }
  }

  render() {
    const {
      isDragging,
      width,
      item,
      id,
      currentOffset,
      wasPieceTouched,
      pieces,
      sourceSquare
    } = this.props;

    console.log(this.state.hoveredSquare)

    return (isDragging || this.state.hoveredSquare === sourceSquare) && item && item.board === id ? (
      <div style={layerStyles}>
        <div style={getItemStyle(currentOffset, wasPieceTouched)}>
          {renderChessPiece({
            width,
            pieces,
            hoveredSquare: this.state.hoveredSquare,
            piece: item.piece,
            isDragging,
            customDragLayerStyles: { opacity: 1 },
            sourceSquare
          })}
        </div>
      </div>
    ) : null;
  }
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  };
}

export default DragLayer(collect)(CustomDragLayer);

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 10,
  left: 0,
  top: 0
};

const getItemStyle = (currentOffset, wasPieceTouched) => {
  if (!currentOffset) return { display: 'none' };

  let { x, y } = currentOffset;
  const transform = wasPieceTouched
    ? `translate(${x}px, ${y + -25}px) scale(2)`
    : `translate(${x}px, ${y}px)`;

  return { transform };
};
