export const COMPANY = {
  NAME: 'Veyora Infotech',
  PRODUCT_NAME: 'Veyora School Management Platform',
  FOUNDER: 'Ayush Sharma',
  CONTACT_PHONES: ['7218632586', '7738759316'],
  EMAIL: 'ayushsharma001.nsk@gmail.com',
  WEBSITE: 'https://veyora.com',
  SUPPORT_EMAIL: 'support@veyora.com',
  TAGLINE: 'Simplifying school management for modern India',
} as const;

export const API_BASE_URL = '/api/v1';

export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 20,
} as const;

export const ACADEMIC_YEARS = ['2024-25', '2025-26', '2026-27'] as const;

export const CLASS_LIST = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] as const;

export const SECTION_LIST = ['A', 'B', 'C', 'D', 'E'] as const;
