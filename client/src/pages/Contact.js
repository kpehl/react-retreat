import React from 'react';
import { Button, CardTitle, CardImg, CardBody, CardSubtitle, CardText } from 'reactstrap';

const Contact = (props) => {
    return (
        <div class="card-deck">
            <div class="flex-row">
                <div class="row card-contact px-2 py-2">
                    <CardImg top width="100%" src="/images/profile/cassie.jpeg" alt="Card image cap" />
                    <CardBody>
                        <CardTitle tag="h5">Kathleen Pehl</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Resort Director</CardSubtitle>
                        <CardText>Kathleen (Cassie) oversees React-Retreat.  Every decision, question, or assignment is either designed or approved by her.  Cassie is the brain and heart behind this fantastic getaway.</CardText>
                        <Button href="https://github.com/kpehl">Contact Kathleen</Button>
                    </CardBody>
                </div>
            </div>
            <div class="flex-row">
                <div class="row card-contact px-2 py-2">
                    <CardImg top width="100%" src="/images/profile/michael.jpeg" alt="Card image cap" />
                    <CardBody>
                        <CardTitle tag="h5">Michael Giddings</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Resort Chief Financial Officer</CardSubtitle>
                        <CardText>Michael oversees all the financial aspects of our relaxing resort.  Every penny that comes in and out of our resort will be looked at by Michael meticulously. He is in charge of control and order.</CardText>
                        <Button href="https://github.com/fondofhats">Contact Michael</Button>
                    </CardBody>
                </div>
            </div>
            <div class="flex-row">
                <div class="row card-contact px-2 py-2">
                    <CardImg top width="100%" src="/images/profile/damaris.jpeg" alt="Card image cap" />
                    <CardBody>
                        <CardTitle tag="h5">Damaris Campos</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Resort Chief Marketing Officer</CardSubtitle>
                        <CardText>Damaris is responsible for sales growth and marketing strategies. Damaris works on the sales generation, cost reduction, and risk mitigation aspect of the business. She is in charge of making the bookings happen.</CardText>
                        <Button href="https://github.com/DCampos07">Contact Damaris</Button>
                    </CardBody>
                </div>
            </div>
            <div class="flex-row">
                <div class="row card-contact px-2 py-2">
                    <CardImg top width="100%" src="/images/profile/cristian.png" alt="Card image cap" />
                    <CardBody>
                        <CardTitle tag="h5">Cristian Acevedo</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Resort Chief Information Officer</CardSubtitle>
                        <CardText>Do you have any questions in regards to our resort? Cristian is the person to contact, he will be able to assist with any issues, or concerns you might need in regards to your stay.</CardText>
                        <Button href="https://github.com/cacevedo2011">Contact Cristian</Button>
                    </CardBody>
                </div>
            </div>
        </div>
    );
};

export default Contact;