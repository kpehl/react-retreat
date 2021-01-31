import React from 'react';
import { Card, Button, CardTitle, CardImg, CardBody, CardSubtitle, CardText, Row, Col } from 'reactstrap';

const Contact = (props) => {
    return (
        <Row>
            <Col sm="6">
                <Card>
                    <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                    <CardBody>
                        <CardTitle tag="h5">Kathleen Pehl</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Resort Director</CardSubtitle>
                        <CardText>Kathleen (Cassie) oversees React-Retreat.  Every decision, question, or assignment is either designed or approved by her.  Cassie is the brain and heart behind this fantastic getaway.</CardText>
                        <Button>Contact Kathleen</Button>
                    </CardBody>
                </Card>
            </Col>
            <Col sm="6">
                <Card>
                    <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                    <CardBody>
                        <CardTitle tag="h5">Michael Giddings</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Resort Chief Financial Officer</CardSubtitle>
                        <CardText>Michael oversees all the financial aspects of our relaxing resort.  Every penny that comes in and out will be looked at by him meticulously.</CardText>
                        <Button>Contact Michael</Button>
                    </CardBody>
                </Card>
            </Col>
            <Col sm="6">
                <Card>
                    <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                    <CardBody>
                        <CardTitle tag="h5">Damaris Campos</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Resort Chief Marketing Officer</CardSubtitle>
                        <CardText>Damaris is responsible for sales growth and marketing strategies. She works on the sales generation, cost reduction, and risk mitigation aspect of the business.</CardText>
                        <Button>Contact Damaris</Button>
                    </CardBody>
                </Card>
            </Col>
            <Col sm="6">
                <Card>
                    <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                    <CardBody>
                        <CardTitle tag="h5">Cristian Acevedo</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Resort Chief Information Officer</CardSubtitle>
                        <CardText>Do you have any questions in regards to our resort and need quick answers? Cristian is the person to contact, he will be able to assist with any issues, concerns, or inforamtion you might need in regards to your stay.</CardText>
                        <Button href="#">Contact Cristian</Button>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default Contact;