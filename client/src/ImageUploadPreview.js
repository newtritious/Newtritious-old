import React from 'react'
import { Image,Container,Row,Col } from 'react-bootstrap'
 
class ImageUploadPreview extends React.Component{
 
    constructor(props) {
        super(props);
        this.state = {file: 'newtritious.png',imagePreviewUrl: 'Newtritious'};
    }
 
    _handleImageChange(e) {
        e.preventDefault();
     
        let reader = new FileReader();
        let file = e.target.files[0];
     
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
     
        reader.readAsDataURL(file)
    }
 
    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<Image src={imagePreviewUrl} thumbnail />);
        } else {
          $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
     
        return (
            <Container>
                <Row>
                    <Col xs={12} md={12}>
                        <form>
                            <label>Please Select Image</label><br />
                            <input type="file"
                                onChange={(e)=>this._handleImageChange(e)} />
                        </form>
                    </Col>
                    <Col xs={12} md={12}>
                        {$imagePreview}
                    </Col>
                </Row>
            </Container>
        )
    }
}
 
export default ImageUploadPreview;