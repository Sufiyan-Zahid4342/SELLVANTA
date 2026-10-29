export const heroTaglines = [
  'Your Brand. Our Strategy. Greater Growth.',
  'Amazon & E-commerce Growth',
  'Turn More Shoppers into Customers',
];

export const services = [
  {
    id: '01',
    title: 'Amazon Account Management',
    description: 'Practical day-to-day support to keep your Seller Central account organized, healthy, and ready to grow.',
    tags: ['Seller Central', 'Account health', 'Catalog support', 'Growth planning'],
  },
  {
    id: '02',
    title: 'Product Listing Optimization',
    description: 'Improve product pages with clear, keyword-informed copy and persuasive creative that helps shoppers decide.',
    tags: ['Keyword research', 'Titles & bullets', 'A+ content', 'Listing images'],
  },
  {
    id: '03',
    title: 'Amazon PPC Management',
    description: 'Build and refine advertising campaigns around your products, goals, and performance data.',
    tags: ['Campaign setup', 'Sponsored Products', 'Bid optimization', 'Performance reporting'],
  },
  {
    id: '04',
    title: 'Product Launch Strategy',
    description: 'Prepare a thoughtful launch plan that connects product positioning, listings, and promotion.',
    tags: ['Market research', 'Launch planning', 'Competitive review', 'Catalog readiness'],
  },
  {
    id: '05',
    title: 'E-commerce Store Growth',
    description: 'Create a consistent shopping experience across Amazon and your direct-to-consumer storefront.',
    tags: ['Shopify', 'Store optimization', 'Conversion experience', 'Channel strategy'],
  },
  {
    id: '06',
    title: 'Creative & Brand Content',
    description: 'Bring your brand story to life with polished product visuals and marketplace-ready content.',
    tags: ['Brand story', 'Product graphics', 'Storefront design', 'Campaign creative'],
  },
];

export const values = [
  {
    title: 'Sell with Strategy',
    description: 'We start with your products, audience, and goals to shape a clear path for sustainable growth.',
  },
  {
    title: 'Make Every Detail Count',
    description: 'From listing copy to campaign structure, the details of the shopping experience matter.',
  },
  {
    title: 'Grow with Clarity',
    description: 'Thoughtful recommendations and transparent communication keep the work focused on your business.',
  },
];

export const contactInfo = {
  address: '33 Clover Ave Apt 8B, East Greenbush, NY 12061-3843',
};

export const serviceOptions = services.map(({ title }) => title);

export const footer = {
  description: 'Your Brand. Our Strategy. Greater Growth.',
  sections: [
    {
      title: 'Our Services',
      items: services.slice(0, 5).map(({ title, id }) => ({
        name: title,
        href: `/services#service-${id}`,
      })),
      columns: 1,
    },
    {
      title: 'Explore',
      items: [
        { name: 'About SELLVANTA', href: '/about' },
        { name: 'Our Approach', href: '/approach' },
        { name: 'Frequently Asked Questions', href: '/contact#faqs' },
        { name: 'Privacy Policy', href: '/PrivacyPolicy' },
        { name: 'Terms & Conditions', href: '/TermsConditions' },
      ],
      columns: 1,
    },
  ],
  getInTouch: [
    {
      icon: 'MapPin',
      text: contactInfo.address,
      href: 'https://maps.google.com/?q=33+Clover+Ave+Apt+8B%2C+East+Greenbush%2C+NY+12061-3843',
    },
  ],
  followUs: [],
  marqueeText: 'Amazon & E-commerce Growth',
  copyright: {
    companyName: 'SELLVANTA',
    additionalText: 'All rights reserved.',
  },
};
