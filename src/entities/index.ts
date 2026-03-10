/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: credentials
 * Interface for ProfessionalCredentials
 */
export interface ProfessionalCredentials {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  credentialName?: string;
  /** @wixFieldType text */
  issuingOrganization?: string;
  /** @wixFieldType number */
  yearObtained?: number;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType url */
  credentialUrl?: string;
}


/**
 * Collection ID: inquiries
 * Interface for ContactInquiries
 */
export interface ContactInquiries {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  phone?: string;
  /** @wixFieldType text */
  message?: string;
  /** @wixFieldType datetime */
  submissionDate?: Date | string;
}


/**
 * Collection ID: services
 * Interface for Services
 */
export interface Services {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  serviceName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  icon?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  benefits?: string;
  /** @wixFieldType url */
  learnMoreUrl?: string;
}
