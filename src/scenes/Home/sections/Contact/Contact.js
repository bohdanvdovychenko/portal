import React from 'react';
import { Container, Row, Col, Input, Button, Form } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postSendEmail } from '../../../../modules/mail/mailAction';
import { Element } from 'react-scroll';
import './Contact.css';

const defaultDelay = window.defaultDelay;

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      subject: '',
      mailbody: '',
      bShow: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeSubject = this.handleChangeSubject.bind(this);
    this.handleChangeMailBody = this.handleChangeMailBody.bind(this);
    this.showComponent = this.showComponent.bind(this);
  }

  showComponent() {
    this.setState({
      bShow: true
    });
  }

  componentDidMount() {
    setTimeout(this.showComponent, defaultDelay);
  }

  handleChangeEmail(event) {
    this.setState({
      email: event.target.value
    });
  }
  handleChangeName(event) {
    this.setState({
      name: event.target.value
    });
  }
  handleChangeSubject(event) {
    this.setState({
      subject: event.target.value
    });
  }
  handleChangeMailBody(event) {
    this.setState({
      mailbody: event.target.value
    });
  }

  handleSubmit(event) {
    //this.props.mailActions.postSendEmail()
    event.preventDefault();

    if (this.props.loading === true) return;

    const data = {
      name: this.state.name,
      email: this.state.email,
      subject: this.state.subject,
      mailbody: this.state.mailbody
    };
    this.props.mailActions.postSendEmail(data);
  }

  render() {
    let messageText = 'Your message was sent, thank you!';
    let messageClass = 'message';
    let messageIcon = 'fa fa-check';
    if (this.props.loading === true) {
      messageClass = 'message hide';
    }
    if (this.props.success === false && this.props.failed === false) {
      messageClass = 'message hide';
    }

    if (this.props.success === false && this.props.failed === true) {
      messageClass = 'message failed';
      messageText = 'Your message is not delivered. Please try again. Thanks!';
      messageIcon = 'fa fa-exclamation-triangle';
    }
    let hideOrShow = 'hidden';
    if (this.state.bShow === true) {
      hideOrShow = '';
    }

    return (
      <Element
        id="contact-section"
        className={['contact-section', hideOrShow].join(' ')}
      >
        <Container>
          <div className="title wow bounceInLeft animated">Contact</div>
          <div className="title-bar wow bounceInLeft animated" />
          <Row className="fadeIn wow animated">
            <Col md={{ size: 6, offset: 3 }} xs="12">
              <Form onSubmit={this.handleSubmit}>
                <Input
                  required
                  type="text"
                  name="name"
                  placeholder="Name"
                  ref={ref => (this.name = ref)}
                  onChange={this.handleChangeName}
                />
                <Input
                  required
                  type="email"
                  name="email"
                  placeholder="Email"
                  ref={ref => (this.email = ref)}
                  onChange={this.handleChangeEmail}
                />
                <Input
                  required
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  ref={ref => (this.subject = ref)}
                  onChange={this.handleChangeSubject}
                />
                <Input
                  required
                  className="subject"
                  rows="5"
                  type="textarea"
                  name="mailbody"
                  placeholder="Hello, Bohdan"
                  ref={ref => (this.mailbody = ref)}
                  onChange={this.handleChangeMailBody}
                />
                <div className={messageClass}>
                  <span className={messageIcon} />
                  {messageText}
                </div>
                <Input
                  type="submit"
                  className="submit-button bounceInRight wow animated"
                  value="Submit"
                >
                  Submit
                </Input>
              </Form>
            </Col>
          </Row>
        </Container>
      </Element>
    );
  }
}

export default connect(
  state => ({
    loading: state.mail.loading,
    error: state.mail.error,
    success: state.mail.success,
    failed: state.mail.failed
  }),
  dispatch => ({
    mailActions: bindActionCreators(
      {
        postSendEmail
      },
      dispatch
    )
  })
)(Contact);
