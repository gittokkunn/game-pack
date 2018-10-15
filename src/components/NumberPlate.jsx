import React, { Component } from 'react';

class NumberPlate
 extends Component {

  render() {
    let {number, setIdx} = this.props
    return (
      <div className="NumberPlate" draggable="true" onClick={setIdx}>
        {number}
      </div>
    );
  }
}

export default NumberPlate
;
