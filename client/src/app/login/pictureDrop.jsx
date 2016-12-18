import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'omnipotentBoop';
const CLOUDINARY_UPLOAD_URL = 'http://cloudinary.359834833498217:3c-AmfTB8zd-uOaxkF0p-kJiwQM@boop';

class PictureDrop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFileCloudinaryUrl: ''
    };
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });
    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }

  render() {
    return (
      <div>
        <div className="FileUpload">
          <Dropzone
            style="{}"
            multiple={false}
            accept="image/*"
            onDrop={this.onImageDrop.bind(this)}
          >
            <img 
              width="50"
              height="50"
              src="http://www.free-icons-download.net/images/digital-camera-icon-27840.png"
            />
          </Dropzone>
        </div>
        <div>
          {this.state.uploadedFileCloudinaryUrl === '' ? null :
          <div>
            <p>{this.state.uploadedFile.name}</p>
            <img src={this.state.uploadedFileCloudinaryUrl} />
          </div>}
        </div>
      </div>
    )
  }
}

export default PictureDrop;