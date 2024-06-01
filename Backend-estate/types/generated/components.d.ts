import type { Schema, Attribute } from '@strapi/strapi';

export interface CarouselCarousel extends Schema.Component {
  collectionName: 'components_carousel_carousels';
  info: {
    displayName: 'carousel';
    description: '';
  };
  attributes: {
    img: Attribute.Media;
  };
}

export interface DescriptionDescription extends Schema.Component {
  collectionName: 'components_description_descriptions';
  info: {
    displayName: 'description';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    fullDescription: Attribute.Blocks;
    shortDescription: Attribute.String;
  };
}

export interface FactsAndFeaturesFactsAndFeatures extends Schema.Component {
  collectionName: 'components_facts_and_features_facts_and_features';
  info: {
    displayName: 'factsAndFeatures';
  };
  attributes: {
    livingRoom: Attribute.String;
    garage: Attribute.String;
    diningArea: Attribute.String;
    bedroom: Attribute.String;
    bathroom: Attribute.String;
    gymArea: Attribute.String;
    garden: Attribute.String;
    parking: Attribute.String;
  };
}

export interface GalleryGallery extends Schema.Component {
  collectionName: 'components_gallery_galleries';
  info: {
    displayName: 'gallery';
  };
  attributes: {
    img1: Attribute.Media;
    img2: Attribute.Media;
    img3: Attribute.Media;
  };
}

export interface PropertyDetailsPropertyDetails extends Schema.Component {
  collectionName: 'components_property_details_property_details';
  info: {
    displayName: 'propertyDetails';
  };
  attributes: {
    propertyId: Attribute.String;
    area: Attribute.Integer;
    propertyStatus: Attribute.Enumeration<['"For Sale", "For Rent"']>;
    rooms: Attribute.Integer;
    bedrooms: Attribute.Integer;
    baths: Attribute.Integer;
    createdYear: Attribute.Integer;
  };
}

export interface SizeSize extends Schema.Component {
  collectionName: 'components_size_sizes';
  info: {
    displayName: 'size';
  };
  attributes: {
    name: Attribute.String;
    stock: Attribute.Integer;
  };
}

export interface VariationVariation extends Schema.Component {
  collectionName: 'components_variation_variations';
  info: {
    displayName: 'variation';
  };
  attributes: {
    color: Attribute.String;
    colorCode: Attribute.String;
    image: Attribute.Media;
    size: Attribute.Component<'size.size'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'carousel.carousel': CarouselCarousel;
      'description.description': DescriptionDescription;
      'facts-and-features.facts-and-features': FactsAndFeaturesFactsAndFeatures;
      'gallery.gallery': GalleryGallery;
      'property-details.property-details': PropertyDetailsPropertyDetails;
      'size.size': SizeSize;
      'variation.variation': VariationVariation;
    }
  }
}
