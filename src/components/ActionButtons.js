// import React, { useState } from "react";
import React from "react";
import Button from '@material-ui/core/Button';
import '../style/components/actionButtons.scss'


function ActionButtons(props) {

    return (
        <div className="actions">
            <Button style={{ backgroundColor: 'orange' }}>
                Discard All Cards
            </Button>
            <Button onClick={() => props.flip()} style={{ backgroundColor: 'orange', margin: '0 10px' }}>
                Flip Cards
            </Button>
        </div>
    )
}

export default ActionButtons
