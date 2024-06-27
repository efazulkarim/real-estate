import React from 'react';
import { Table } from 'react-bootstrap';
import { FaStar, FaRegStarHalf, FaRegStar, FaTrashAlt } from 'react-icons/fa';
import Link from 'next/link';

function PropertyInfo({ properties }) {
  return (
    <div className="ltn__myaccount-tab-content-inner">
      <div className="ltn__my-properties-table table-responsive">
        <Table>
          <thead>
            <tr>
              <th scope="col">Property</th>
              <th scope="col"></th>
              <th scope="col">Date Added</th>
              <th scope="col">Actions</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property, index) => (
              <tr key={index}>
                <td className="ltn__my-properties-img">
                  <Link href={property.link}>
                    <img src={property.image} alt="#" />
                  </Link>
                </td>
                <td>
                  <div className="ltn__my-properties-info">
                    <h6 className="mb-10">
                      <Link href={property.link}>{property.title}</Link>
                    </h6>
                    <small>
                      <i className="icon-placeholder"></i>
                      {property.location}
                    </small>
                    <div className="product-ratting">
                      <ul>
                        <li><Link href="#"><span><FaStar /></span></Link></li>
                        <li><Link href="#"><span><FaStar /></span></Link></li>
                        <li><Link href="#"><span><FaStar /></span></Link></li>
                        <li><Link href="#"><span><FaRegStarHalf /></span></Link></li>
                        <li><Link href="#"><span><FaRegStar /></span></Link></li>
                        <li className="review-total"><Link href="#">(95 Reviews)</Link></li>
                      </ul>
                    </div>
                  </div>
                </td>
                <td>{property.dateAdded}</td>
                <td><Link href="#">Edit</Link></td>
                <td><Link href="#"><FaTrashAlt /></Link></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default PropertyInfo;
