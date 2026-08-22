// ──────────────────────────────────────────────────────────────────────────
// EDIT THIS FILE to customize the entire site — names, dates, venues, photos.
// Nothing else in the codebase needs to change.
// ──────────────────────────────────────────────────────────────────────────

export const couple = {
  groom: 'Rakesh',
  bride: 'Priya',
  groomFull: 'Rakesh Sharma',
  brideFull: 'Priya Mehta',
  weddingDate: '2026-12-12T10:00:00',
  weddingDateDisplay: 'December 12, 2026',
  city: 'Udaipur, Rajasthan',
  hashtag: '#RakeshWedsPriya',
};

export const heroVideo = '/media/video/hero-bg.mp4';
// Fallback poster shown while the video loads / if none is supplied.
// Drop your own couple photo at /media/couple/hero-couple.jpg and point
// this at '/media/couple/hero-couple.jpg' to use it instead.
export const heroPoster =
  'https://images.unsplash.com/photo-1721635513002-287a3a3b2fa1?q=80&w=1920&auto=format&fit=crop';

export const music = {
  src: '/audio/wedding-theme.mp3',
  title: 'Their Song',
};

export const familyIntro = {
  bride: {
    title: "The Bride's Family",
    parents: 'Daughter of Mr. Anil Mehta & Mrs. Sunita Mehta',
    members: [
      { name: 'Anil Mehta', relation: 'Father', photo: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=600&auto=format&fit=crop' },
      { name: 'Sunita Mehta', relation: 'Mother', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop' },
      { name: 'Aanya Mehta', relation: 'Sister', photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=600&auto=format&fit=crop' },
    ],
  },
  groom: {
    title: "The Groom's Family",
    parents: 'Son of Mr. Vinod Sharma & Mrs. Kavita Sharma',
    members: [
      { name: 'Vinod Sharma', relation: 'Father', photo: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=600&auto=format&fit=crop' },
      { name: 'Kavita Sharma', relation: 'Mother', photo: 'https://images.unsplash.com/photo-1581065178026-390bc4e78dad?q=80&w=600&auto=format&fit=crop' },
      { name: 'Arjun Sharma', relation: 'Brother', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop' },
    ],
  },
};

export const storyTimeline = [
  {
    year: '2019',
    title: 'First Meeting',
    text: 'A chance introduction at a college friend\u2019s birthday dinner — Rakesh spilled his drink, Priya never let him forget it.',
    photo: 'https://images.unsplash.com/photo-1521543387232-d96323a9e1f7?q=80&w=900&auto=format&fit=crop',
  },
  {
    year: '2020',
    title: 'Friendship',
    text: 'Late-night calls turned into daily ones. Somewhere between long drives and longer conversations, friendship took root.',
    photo: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=900&auto=format&fit=crop',
  },
  {
    year: '2022',
    title: 'Falling In Love',
    text: 'A rainy evening in Udaipur, a rooftop, and an unspoken truth that finally needed no words.',
    photo: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=900&auto=format&fit=crop',
  },
  {
    year: '2024',
    title: 'The Proposal',
    text: 'On a hill overlooking the lake city, with the sun setting behind them, Rakesh asked and Priya said yes before he finished.',
    photo: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=900&auto=format&fit=crop',
  },
  {
    year: '2026',
    title: 'Forever Begins',
    text: 'Two families, one celebration. Join them as they begin the rest of their story together.',
    photo: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=900&auto=format&fit=crop',
  },
];

export const events = [
  {
    name: 'Mehendi',
    date: 'Dec 9, 2026',
    time: '4:00 PM – 8:00 PM',
    venue: 'Rambagh Lawns, Udaipur',
    note: 'Colors & traditional attire encouraged',
  },
  {
    name: 'Haldi',
    date: 'Dec 10, 2026',
    time: '10:00 AM – 1:00 PM',
    venue: 'Family Residence, Udaipur',
    note: 'Wear yellow — things will get messy',
  },
  {
    name: 'Sangeet',
    date: 'Dec 10, 2026',
    time: '7:00 PM – 11:00 PM',
    venue: 'The Leela Palace, Udaipur',
    note: 'Festive evening wear',
  },
  {
    name: 'Wedding Ceremony',
    date: 'Dec 12, 2026',
    time: '7:30 PM onward',
    venue: 'Lake Pichola Lawns, Udaipur',
    note: 'Traditional ceremonial attire',
  },
  {
    name: 'Reception',
    date: 'Dec 13, 2026',
    time: '7:00 PM – 11:00 PM',
    venue: 'The Leela Palace, Udaipur',
    note: 'Black tie / Indo-western',
  },
];

export const venue = {
  name: 'The Leela Palace, Udaipur',
  address: 'Lake Pichola, Udaipur, Rajasthan 313001, India',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.0!2d73.6862!3d24.5841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDM1JzAyLjgiTiA3M8KwNDEnMTAuMyJF!5e0!3m2!1sen!2sin!4v1700000000000',
  mapsLink: 'https://maps.google.com/?q=The+Leela+Palace+Udaipur',
  photo: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1400&auto=format&fit=crop',
};

export const films = [
  {
    id: 'save-the-date',
    title: 'Save The Date',
    description: 'A playful teaser announcing the big day.',
    thumbnail: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1200&auto=format&fit=crop',
    video: '/media/video/films/save-the-date.mp4',
  },
  {
    id: 'pre-wedding',
    title: 'Pre-Wedding Shoot',
    description: 'Shot on the lakes and palaces of Udaipur.',
    thumbnail: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop',
    video: '/media/video/films/pre-wedding.mp4',
  },
  {
    id: 'proposal',
    title: 'The Proposal',
    description: 'The moment that changed everything.',
    thumbnail: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1200&auto=format&fit=crop',
    video: '/media/video/films/proposal.mp4',
  },
];

export const galleryImages = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1521543387232-d96323a9e1f7?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=900&auto=format&fit=crop',
];

// Photos shown in the orbiting 3D carousel in the "Step Into Our
// Celebration" section (Experience3D.jsx). Defaults to the first 6 gallery
// photos — list different images here (local /media/gallery/* paths work
// too) to use a different set just for the 3D carousel. 4-8 photos looks
// best; more than that starts to feel crowded on the ring.
export const carouselPhotos = galleryImages.slice(0, 6);

export const galleryVideos = [
  // Add direct mp4 urls or local /media/gallery/video-1.mp4 paths here.
];

export const giftInfo = {
  upiId: 'rakeshpriya@upi',
  qrImage: '/media/qr-code.png',
  message:
    'Your presence is the only gift we need. For those who insist, a contribution toward our new home would be cherished.',
};

export const contact = {
  groomPhone: '+91 98765 43210',
  bridePhone: '+91 91234 56789',
  email: 'hello@rakeshandpriya.com',
  instagram: 'https://instagram.com',
  whatsapp: 'https://wa.me/919876543210',
};

export const faqs = [
  { q: 'What time does the wedding ceremony start?', a: 'The wedding ceremony begins at 7:30 PM on December 12, 2026, at Lake Pichola Lawns, Udaipur.' },
  { q: 'What is the dress code?', a: 'Mehendi & Sangeet are festive ethnic wear, Haldi is casual yellow, the Wedding Ceremony calls for traditional attire, and the Reception is black tie / Indo-western.' },
  { q: 'Where is the venue?', a: 'The main ceremony and reception are at The Leela Palace, Udaipur, on the banks of Lake Pichola.' },
  { q: 'Who can I contact for help?', a: 'You can reach the groom\u2019s side at +91 98765 43210 or the bride\u2019s side at +91 91234 56789.' },
  { q: 'Is there parking / transport available?', a: 'Valet parking is available at the venue, and shuttles will run from partner hotels — details will be shared closer to the date.' },
];
