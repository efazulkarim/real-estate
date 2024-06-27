import React from 'react';
import { Row, Col } from 'react-bootstrap';

function ProfileInfo({ user }) {
  return (
    <div className="ltn__myaccount-tab-content-inner">
      <Row>
        <Col xs={12} md={6}>
          <div>
            <label>First Name:</label>
            <p>{user.firstName}</p>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div>
            <label>Last Name:</label>
            <p>{user.lastName}</p>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div>
            <label>Email:</label>
            <p>{user.email}</p>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ProfileInfo;
