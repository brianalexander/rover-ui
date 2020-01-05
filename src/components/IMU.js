import React, { Component } from "react";
import { OBJModel } from "react-3d-viewer";

class IMU extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <OBJModel
          enableZoom={true}
          width={500}
          height={500}
          texPath=""
          src="./rover-model.obj"
          position={{ x: -40, y: -25, z: -35 }}
        />
      </div>
    );
  }
}

export default IMU;
