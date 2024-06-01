const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

// Replace with your Strapi URL and token
const strapiURL = 'http://localhost:1337';
const adminToken = '4ded75e5f34c2c84928a2e643e35c5ecfecd826ed5c78446e9e10f99ac302b032604bd5231d821ce9fd9a961abef3652313ff0770c14b8cb75f4a7e1b219727db5cee7d002ccc8e4b89ac0d30f1b413ec70c5c7f924a48a92265e61b05420ea9416484e4ced44825996f1301f0bcec907f81d2cee531de56ed6b8c67c5c70c52';

// @ts-ignore
const jsonData = require('../FrontEnd-estate/src/data/products'); // Adjust the path to your JSON file
const imageFolderPath = path.join(__dirname, '../public/img/images'); // Adjust the path to your images folder

const uploadImage = async (imagePath) => {
  const imageName = path.basename(imagePath);
  const imageData = fs.createReadStream(imagePath);

  const form = new FormData();
  form.append('files', imageData, imageName);

  const response = await axios.post(`${strapiURL}/upload`, form, {
    headers: {
      'Authorization': `Bearer ${adminToken}`,
      ...form.getHeaders()
    }
  });

  return response.data[0];
};

const importData = async () => {
  for (const item of jsonData) {
    let productImgId = null;
    if (item.productImg) {
      const productImgPath = path.join(imageFolderPath, item.productImg);
      const uploadedProductImg = await uploadImage(productImgPath);
      productImgId = uploadedProductImg.id;
    }

    const carouselImages = [];
    for (const carouselItem of item.carousel) {
      const carouselImgPath = path.join(imageFolderPath, carouselItem.img);
      const uploadedCarouselImg = await uploadImage(carouselImgPath);
      carouselImages.push({ img: uploadedCarouselImg.id });
    }

    const galleryImages = {};
    for (const [key, value] of Object.entries(item.gallery)) {
      const galleryImgPath = path.join(imageFolderPath, value);
      const uploadedGalleryImg = await uploadImage(galleryImgPath);
      galleryImages[key] = uploadedGalleryImg.id;
    }

    const agentResponse = await axios.post(`${strapiURL}/agents`, {
      firstName: item.agent.firstName,
      lastName: item.agent.lastName,
      fullName: item.agent.fullName,
      type: item.agent.type,
      img: (await uploadImage(path.join(imageFolderPath, item.agent.img))).id,
      designation: item.agent.designation,
      rating: item.agent.rating,
      description: item.agent.description,
      social: item.agent.social
    }, {
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    });

    const agentId = agentResponse.data.id;

    const propertyResponse = await axios.post(`${strapiURL}/properties`, {
      title: item.title,
      carousel: carouselImages,
      productImg: productImgId,
      price: item.price,
      priceRange: item.priceRange,
      discount: item.discount,
      country: item.country,
      district: item.district,
      properties: item.properties,
      featured: item.featured,
      new: item.new,
      rent: item.rent,
      photo: item.photo,
      video: item.video,
      bedBath: item.bedBath,
      ratingCount: item.ratingCount,
      rating: item.rating,
      saleCount: item.saleCount,
      category: item.category,
      tag: item.tag,
      date: item.date,
      comments: item.comments,
      location: item.location,
      description: item.description,
      propertyDetails: item.propertyDetails,
      factsAndFeatures: item.factsAndFeatures,
      amenities1: item.amenities1,
      amenities2: item.amenities2,
      amenities3: item.amenities3,
      AmenitiesList: item.AmenitiesList,
      agent: agentId,
      gallery: galleryImages,
      propertyTypes: item.propertyTypes,
      variation: item.variation
    }, {
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    });

    console.log(`Imported property: ${item.title}`);
  }
};

importData().catch(console.error);
