import React from 'react';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
function MyComponent() {
  const style = {
    height: 50,
    border: 'dashed 2px #999',
    borderRadius: 5,
    position: 'relative',
    cursor: 'pointer',
  }
 
  const uploaderProps = {
    style,
    maxFileSize: 1024 * 1024 * 50,
    server: 'https://example/com',
    s3Url: 'https://my-bucket.s3.amazonaws.com/',
    signingUrlQueryParams: {uploadType: 'avatar'},
  }

  const handleFinishedUpload = function () {

  }

  return (
    <DropzoneS3Uploader onFinish={this.handleFinishedUpload} {...uploaderProps} />
  )
}

export default MyComponent;