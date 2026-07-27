/**
 * @typedef {Object} ServiceStat
 * @property {string} value
 * @property {string} label
 */

/**
 * @typedef {Object} Service
 * @property {string} id
 * @property {number} order
 * @property {string} name
 * @property {string} shortDescription
 * @property {string} icon
 * @property {ServiceStat} stat
 * @property {[string, string]} gradient
 * @property {string[]} included
 * @property {string} cardImage
 */

/**
 * @typedef {Object} HeroStat
 * @property {string} id
 * @property {number} value
 * @property {string} suffix
 * @property {string} label
 */

/**
 * @typedef {Object} GrowthRecord
 * @property {string} year
 * @property {number} sqft
 */

/**
 * @typedef {Object} ClientGrowthRecord
 * @property {string} year
 * @property {number} clients
 */

/**
 * @typedef {Object} ServiceMixCategory
 * @property {string} name
 * @property {number} value
 * @property {string} color
 */

/**
 * @typedef {Object} RegionalPresence
 * @property {string} location
 * @property {string} state
 * @property {boolean} isHQ
 * @property {[number, number]} coords
 */

/**
 * @typedef {Object} CaseStudy
 * @property {string} id
 * @property {string} propertyName
 * @property {string} category
 * @property {string} sqft
 * @property {string[]} servicesProvided
 * @property {string} outcome
 * @property {string} image
 */

/**
 * @typedef {Object} ClientLogo
 * @property {string} id
 * @property {string} name
 * @property {string} category
 * @property {string} logo
 */

/**
 * @typedef {Object} Testimonial
 * @property {number} id
 * @property {string} quoteSummary
 * @property {string} authorName
 * @property {string} authorRole
 * @property {string} propertyType
 * @property {string} avatar
 */

/**
 * @typedef {Object} CareerBenefit
 * @property {string} id
 * @property {string} icon
 * @property {string} title
 * @property {string} description
 */

/**
 * @typedef {Object} OpenRole
 * @property {string} id
 * @property {string} title
 * @property {string} department
 * @property {string} location
 * @property {string} type
 * @property {string} experience
 * @property {string} description
 */

/**
 * @typedef {Object} FounderInfo
 * @property {string} name
 * @property {string} role
 * @property {string} background
 * @property {string} quote
 * @property {string} bio
 */

/**
 * @typedef {Object} HeadquartersInfo
 * @property {string} city
 * @property {string} state
 * @property {string} country
 * @property {string} address
 */

/**
 * @typedef {Object} CompanyMilestone
 * @property {string} year
 * @property {string} title
 * @property {string} description
 */

/**
 * @typedef {Object} CompanyValue
 * @property {string} title
 * @property {string} description
 */
export {};
