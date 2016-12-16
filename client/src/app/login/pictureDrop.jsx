import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

class PictureDrop extends React.Component {
  render() {
    return (
      <Dropzone
        multiple={false}
        accept="image/*"
      >
        <img 
          width="200"
          height="200"
          src="http://www.free-icons-download.net/images/digital-camera-icon-27840.png"
        />
      </Dropzone>
    )
  }
}

export default PictureDrop;