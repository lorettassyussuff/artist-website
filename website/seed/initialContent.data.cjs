const siteSettings = {
  _type: "siteSettings",
  siteTitle: "Loretta Yussuff",
  tagline: "Figuration as a record of inner experience and human complexity",
  description:
    "Loretta Yussuff is an artist whose practice uses figuration to hold inner experience, memory, and human complexity across painting, print, and installation.",
  email: "hello@lorettayussuff.co.uk",
  instagramUrl: "https://www.instagram.com/lorettayussuff/",
  mailingListUrl:
    "mailto:hello@lorettayussuff.co.uk?subject=Mailing%20List&body=Please%20add%20me%20to%20the%20Loretta%20Yussuff%20mailing%20list.",
  aboutNavLabel: "About",
  selectedWorksNavLabel: "Selected Works",
  cvNavLabel: "CV",
  writingsNavLabel: "Writings",
  contactNavLabel: "Contact",
  instagramLabel: "Instagram",
};

const homePage = {
  _type: "homePage",
  title: "Home",
  intro: [
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "Figuration as a record of inner experience and human complexity",
        },
      ],
    },
  ],
  heroImageAssetPath:
    "website/public/assets/home/b6f7a640-70b3-435a-971b-b1f3ca2e2675.png",
  heroImageAlt: "Psalm 2: Death Waiting (detail), 2025, Oil on canvas",
  heroCaption: "Psalm 2: Death Waiting (detail), 2025, Oil on canvas",
};

const aboutPage = {
  _type: "aboutPage",
  title: "About",
  sectionEyebrow: "About",
  sectionTitle:
    "A practice grounded in figuration, memory, and lived interiority.",
  body: [
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "Loretta Yussuff is a London-based artist working across painting, print, and installation. Her practice centres figuration as a way of recording inner experience, holding the emotional, spiritual, and psychological weight of a body in relation to memory, faith, and everyday life.",
        },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "Her images move between portraiture, symbolic form, and lived observation. Across the work, figures are used not simply to describe appearance, but to register complexity, vulnerability, ritual, and the felt texture of being human.",
        },
      ],
    },
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "Working from the studio as well as from installation contexts, Yussuff builds spaces where intimacy, devotion, tension, and personal history can sit together. Her paintings and prints hold a directness that feels immediate, but they also remain open, layered, and unresolved in productive ways.",
        },
      ],
    },
  ],
  portraitAssetPath: "website/public/assets/about/studio-portrait.jpg",
  portraitAlt: "Loretta Yussuff in the studio in front of works in progress.",
  cvLinkLabel: "View CV",
  instagramLinkLabel: "Instagram",
};

const selectedWorksPage = {
  _type: "selectedWorksPage",
  title: "Selected Works",
  paintingsTitle: "Paintings",
  paintingsIntro:
    "A focused sequence of paintings presented one image at a time.",
  paintingsNavLabel: "Paintings",
  printsTitle: "Works on paper",
  printsIntro: "A smaller group of works on paper and print-based pieces.",
  printsNavLabel: "Works on paper",
};

const cvPage = {
  _type: "cvPage",
  title: "CV",
  sectionEyebrow: "CV",
  sectionTitle: "Exhibitions, education, press, awards, and commissions.",
};

const writingsPage = {
  _type: "writingsPage",
  title: "Writings",
  sectionEyebrow: "Writings",
  sectionTitle:
    "Writing as a parallel space for image, reflection, and language.",
  intro: [
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "Writing sits alongside the studio practice as another way of approaching image, memory, and emotional register. Rather than functioning as explanation, it offers a parallel space for reflection and language.",
        },
      ],
    },
  ],
  publicationTitle: "The Crab",
  publicationDescription:
    "Writing sits alongside the studio practice as another way of approaching image, memory, and emotional register. Rather than functioning as explanation, it offers a parallel space for reflection and language.",
  publicationPdfAssetPath:
    "website/public/assets/writings/the-crab-official.pdf",
};

const contactPage = {
  _type: "contactPage",
  title: "Contact",
  sectionEyebrow: "Contact",
  sectionTitle: "For enquiries, updates, and new work.",
  intro: [
    {
      _type: "block",
      style: "normal",
      children: [
        {
          _type: "span",
          text: "For exhibitions, commissions, studio enquiries, and new work.",
        },
      ],
    },
  ],
  items: [
    {
      _type: "contactItem",
      label: "Email",
      value: "hello@lorettayussuff.co.uk",
      href: "mailto:hello@lorettayussuff.co.uk",
      icon: "email",
    },
    {
      _type: "contactItem",
      label: "Mailing List",
      value: "Join via email",
      href: "mailto:hello@lorettayussuff.co.uk?subject=Mailing%20List&body=Please%20add%20me%20to%20the%20Loretta%20Yussuff%20mailing%20list.",
      icon: "none",
    },
    {
      _type: "contactItem",
      label: "Instagram",
      value: "@lorettayussuff",
      href: "https://www.instagram.com/lorettayussuff/",
      icon: "instagram",
    },
  ],
};

const artworks = [
  {
    _type: "artwork",
    title: "Psalm 1: Reload It",
    slug: { current: "psalm-1-reload-it-2025" },
    category: "painting",
    date: 2025,
    medium: "Oil on canvas",
    dimensions: "120 x 60cm",
    credit: "© Loretta Yussuff",
    featured: true,
    sortOrder: 1,
    imageAssetPath: "website/public/assets/paintings/painting-02.png",
  },
  {
    _type: "artwork",
    title: "Psalm 2: Death Waiting",
    slug: { current: "psalm-2-death-waiting-2025" },
    category: "painting",
    date: 2025,
    medium: "Oil on canvas",
    dimensions: "120 x 65cm",
    credit: "© Loretta Yussuff",
    featured: true,
    sortOrder: 2,
    imageAssetPath: "website/public/assets/paintings/painting-01.png",
  },
  {
    _type: "artwork",
    title: "Psalm 3: Damilola",
    slug: { current: "psalm-3-damilola-2025" },
    category: "painting",
    date: 2025,
    medium: "Oil on canvas",
    dimensions: "48.5 x 42.5cm",
    credit: "© Loretta Yussuff. Photo: Point101",
    featured: true,
    sortOrder: 3,
    imageAssetPath: "website/public/assets/paintings/painting-04.png",
  },
  {
    _type: "artwork",
    title: "Mourning in Gaza",
    slug: { current: "mourning-in-gaza-2025" },
    category: "painting",
    date: 2025,
    medium: "Oil on wood panel",
    dimensions: "21 x 15cm",
    credit: "© Loretta Yussuff",
    featured: true,
    sortOrder: 4,
    imageAssetPath: "website/public/assets/paintings/painting-03.png",
  },
  {
    _type: "artwork",
    title: "AJ Laughing",
    slug: { current: "aj-laughing-2025" },
    category: "painting",
    date: 2025,
    medium: "Oil on canvas",
    dimensions: "42.5 x 48.5cm",
    credit: "© Loretta Yussuff",
    featured: true,
    sortOrder: 5,
    imageAssetPath: "website/public/assets/paintings/painting-05.png",
  },
  {
    _type: "artwork",
    title: "Return of the Lost Lamb",
    slug: { current: "return-of-the-lost-lamb-2024" },
    category: "painting",
    date: 2024,
    medium: "Oil on canvas",
    dimensions: "40 x 40cm",
    credit: "© Loretta Yussuff",
    featured: true,
    sortOrder: 6,
    imageAssetPath: "website/public/assets/paintings/painting-06.png",
  },
  {
    _type: "artwork",
    title: "The Wolf and the Sheep",
    slug: { current: "the-wolf-and-the-sheep-2024" },
    category: "painting",
    date: 2024,
    medium: "Oil on canvas",
    dimensions: "20 x 20cm",
    credit: "© Loretta Yussuff",
    featured: true,
    sortOrder: 7,
    imageAssetPath: "website/public/assets/paintings/painting-07.png",
  },
  {
    _type: "artwork",
    title: "Father and Son",
    slug: { current: "father-and-son-2023" },
    category: "painting",
    date: 2023,
    medium: "Oil on canvas",
    dimensions: "26.5 x 31.5cm",
    credit: "© Loretta Yussuff",
    featured: true,
    sortOrder: 8,
    imageAssetPath: "website/public/assets/paintings/painting-08.png",
  },
  {
    _type: "artwork",
    title: "Little Me",
    slug: { current: "little-me-2022" },
    category: "painting",
    date: 2022,
    medium: "Oil on canvas",
    dimensions: "44 x 54cm",
    credit: "© Loretta Yussuff",
    featured: true,
    sortOrder: 9,
    imageAssetPath: "website/public/assets/paintings/painting-09.png",
  },
  {
    _type: "artwork",
    title: "Print 1",
    slug: { current: "print-1" },
    category: "print",
    credit: "© Loretta Yussuff",
    featured: false,
    sortOrder: 101,
    imageAssetPath: "website/public/assets/prints/print-01.jpg",
  },
  {
    _type: "artwork",
    title: "Print 2",
    slug: { current: "print-2" },
    category: "print",
    credit: "© Loretta Yussuff",
    featured: false,
    sortOrder: 102,
    imageAssetPath: "website/public/assets/prints/print-02.jpg",
  },
  {
    _type: "artwork",
    title: "Print 3",
    slug: { current: "print-3" },
    category: "print",
    credit: "© Loretta Yussuff",
    featured: false,
    sortOrder: 103,
    imageAssetPath: "website/public/assets/prints/print-03.png",
  },
  {
    _type: "artwork",
    title: "Installation View 1",
    slug: { current: "installation-view-1" },
    category: "installation",
    credit: "© Loretta Yussuff",
    featured: false,
    sortOrder: 201,
    imageAssetPath: "website/public/assets/installation/installation-01.jpg",
  },
  {
    _type: "artwork",
    title: "Installation View 2",
    slug: { current: "installation-view-2" },
    category: "installation",
    credit: "© Loretta Yussuff",
    featured: false,
    sortOrder: 202,
    imageAssetPath: "website/public/assets/installation/installation-02.jpg",
  },
  {
    _type: "artwork",
    title: "Installation View 3",
    slug: { current: "installation-view-3" },
    category: "installation",
    credit: "© Loretta Yussuff",
    featured: false,
    sortOrder: 203,
    imageAssetPath: "website/public/assets/installation/installation-03.jpg",
  },
  {
    _type: "artwork",
    title: "Installation View 4",
    slug: { current: "installation-view-4" },
    category: "installation",
    credit: "© Loretta Yussuff",
    featured: false,
    sortOrder: 204,
    imageAssetPath: "website/public/assets/installation/installation-04.jpg",
  },
];

const cvSections = [
  {
    _type: "cvSection",
    title: "SELECTED EXHIBITIONS / PRESENTATIONS",
    sortOrder: 1,
    entries: [
      {
        line: "Metabolizer, South London Gallery Research Festival, Clore Studio, London, 2025",
      },
      { line: "Low End Theory, Camberwell College of Arts, London, 2025" },
      {
        line: "UAL Postgraduate Show, Camberwell College of Arts, London, 2025",
      },
      {
        line: "Speaking from the Margins, London College of Communication, London, 2025",
      },
      { line: "The Spaces Between, Arts SU Gallery, London, 2025" },
      { line: "Seeking, UAL Wilson Road, London, 2025" },
      {
        line: "Millbank Tower Group Exhibition, Camberwell College of Arts, London, 2025",
      },
      {
        line: "UAL Group Exhibition, University of the Arts London, 2024",
      },
    ],
  },
  {
    _type: "cvSection",
    title: "GROUP EXHIBITIONS / PROJECTS",
    sortOrder: 2,
    entries: [
      { line: "FOMO: Edition 001, Bleur Studios, London, 2025" },
      { line: "Black Shades Enterprise Exhibition, London, 2024" },
      {
        line: "Beyond the Surface, South London Women Artists Collective, Jeannie Avent Gallery, London, 2023",
      },
      {
        line: "Doncaster Art Fair – Art x Mental Health Online Exhibition, 2023",
      },
      { line: "Brixton Blog & Bugle Summer Art Show, London, 2023" },
      { line: "Art for Artists Private Viewing, London, 2023" },
      { line: "Black Shades Enterprise Meraki Event, London, 2023" },
      {
        line: "Something’s Fermenting Pop-Up Exhibition, Cosimo x Renegade, London, 2023",
      },
      {
        line: "Codes of the Unconscious, The Holy Art Gallery, London, 2022",
      },
      {
        line: "Twisted Staircase to Happiness (Private Viewing), Vie-D’artiste, London, 2022",
      },
      {
        line: "This Reality (Online Exhibition), Art Girl Rising x Repaint History, London, 2022",
      },
      {
        line: "Canvas International Art Fair, The Room Contemporary Art Space, Venice, 2022",
      },
      { line: "Faces, King House Gallery, London, 2021" },
    ],
  },
  {
    _type: "cvSection",
    title: "COMMISSIONS",
    sortOrder: 3,
    entries: [
      {
        line: "Windrush Commemoration Public Artwork, commissioned by Qemamu Mosaics, London, 2025",
      },
      { line: "Portrait Commission, Andre Harrison, 2023" },
      { line: "Artwork Commission, COMPLEXDS, 2022" },
    ],
  },
  {
    _type: "cvSection",
    title: "PRESS / PUBLICATIONS",
    sortOrder: 4,
    entries: [
      { line: 'Vanity Fair, "Hall of Frames", October 2023' },
      { line: 'Vanity Fair, "State of the Art", September 2023' },
      { line: "Cosimo Podcast, Artist Interview, 2023" },
      {
        line: 'Brixton Blog & Bugle, "Winner of Our Best Art Show to Date", 2022',
      },
      { line: 'Omnifinery, "Everything Escapes You", 2021' },
    ],
  },
  {
    _type: "cvSection",
    title: "EDUCATION",
    sortOrder: 5,
    entries: [
      {
        line: "MA Fine Art: Painting, University of the Arts London (UAL), 2023–2025",
      },
      { line: "BA Fashion Design, University for the Creative Arts, 2020" },
    ],
  },
];

module.exports = {
  siteSettings,
  homePage,
  aboutPage,
  selectedWorksPage,
  cvPage,
  writingsPage,
  contactPage,
  artworks,
  cvSections,
};
