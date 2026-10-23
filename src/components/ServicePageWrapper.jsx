import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ServicePage from './ServicePage';
import { servicePagesData } from '../config/seoConfig';

export default function ServicePageWrapper({ onBookService }) {
  const { serviceSlug } = useParams();

  if (!serviceSlug || !servicePagesData[serviceSlug]) {
    return <Navigate to="/" replace />;
  }

  return <ServicePage serviceKey={serviceSlug} onBookService={onBookService} />;
}
