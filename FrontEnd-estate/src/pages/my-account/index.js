import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import { FaHome, FaUserAlt, FaList, FaHeart, FaSignOutAlt } from 'react-icons/fa';
import { signOut } from '@/store/slices/authSlice';
import ShopBreadCrumb from '@/components/breadCrumbs/shop';
import CallToAction from '@/components/callToAction';
import Link from 'next/link';
import ProfileInfo from '@/components/ProfileInfo';
/* import PropertyInfo from '@/components/PropertyInfo'; */
import { LayoutOne } from "@/layouts";

function MyAccount() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(signOut());
  };

  if (!user) {
    return <div>Please login to access your account.</div>;
  }

  return (
    <>
      <LayoutOne topbar={true}>
        <ShopBreadCrumb
          title="My Account"
          sectionPace=""
          currentSlug="My Account"
        />
        <div className="liton__wishlist-area pb-70">
          <Container>
            <Row>
              <Col xs={12}>
                <div className="ltn__product-tab-area">
                  <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey="dashboard"
                  >
                    <Row>
                      <Col xs={12} lg={4}>
                        <div className="ltn__tab-menu-list mb-50">
                          <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                              <Nav.Link eventKey="dashboard">
                                Dashboard <FaHome />
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="profile">
                                Profile <FaUserAlt />
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="properties">
                                My Properties <FaList />
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="favorites">
                                Favorited Properties <FaHeart />
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link href="/login" onClick={handleLogout}>
                                Logout <FaSignOutAlt />
                              </Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </div>
                      </Col>
                      <Col xs={12} lg={8}>
                        <Tab.Content>
                          <Tab.Pane eventKey="dashboard">
                            <div className="ltn__myaccount-tab-content-inner">
                              <p>
                                Hello <strong>{user.firstName} {user.lastName}</strong> (not
                                <strong>{user.firstName} {user.lastName}</strong>?
                                <small>
                                  <Link href="/login" onClick={handleLogout}>
                                    Log out
                                  </Link>
                                </small>
                                )
                              </p>
                              <p>
                                From your account dashboard you can view your
                                recent orders, manage your shipping and billing addresses, and
                                edit your password and account details.
                              </p>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey="profile">
                            <ProfileInfo user={user} />
                          </Tab.Pane>
                          {/* <Tab.Pane eventKey="properties">
                            <PropertyInfo properties={user.properties} />
                          </Tab.Pane>
                          <Tab.Pane eventKey="favorites">
                            <PropertyInfo properties={user.favoriteProperties} />
                          </Tab.Pane> */}
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="ltn__call-to-action-area call-to-action-6 before-bg-bottom">
          <Container>
            <Row>
              <Col xs={12}>
                <CallToAction />
              </Col>
            </Row>
          </Container>
        </div>
      </LayoutOne>
    </>
  );
}

export default MyAccount;
