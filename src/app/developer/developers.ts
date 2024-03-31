type dev = {
  name: string;
  image_url: string;
  imageInCenter?: boolean;
  roll?: number;
  group?: number;
  email?: string;
  phone?: string;
  profile_url?: string | { platform: string; url: string }[];
  modal_image_url?: string;
  post: string;
  dept?: string | null;
};
type devData = {
  [key: string]: dev[];
};

const x: devData = {
  'SUPERVISION AND GUIDELINES': [
    {
      name: 'Ahammad Shawki',
      image_url:
        'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/15.jpg',
      modal_image_url: '/image/executives/2022-2023/15.png',
      profile_url: [{ platform: 'facebook', url: 'https://www.facebook.com/ahammadshawki8/' }],
      post: 'President (2022-23)',
      dept: 'Web & App Development',
      group: 5,
      roll: 12305042,
      email: 'ahammadshawki8@gmail.com',
      phone: '+88 01946821177',
    },
    {
      name: 'Md. Naimur Rahman',
      image_url:
        'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/16.jpg',
      modal_image_url: '/image/executives/2022-2023/16.png',
      profile_url: [{ platform: 'facebook', url: 'https://www.facebook.com/mdnaimur020' }],
      post: 'Secretary (2022-23)',
      dept: 'Web & App Development',
      group: 4,
      roll: 12304096,
      email: 'mdnaimur020@gmail.com',
      phone: '+88 01940289890',
    },

    {
      name: 'Nafe Ibne Delower',
      image_url: '/image/Developers/Nafe.png',
      modal_image_url: '/image/Developers/tr-Nafe.png',
      profile_url: [
        { platform: 'facebook', url: 'https://www.facebook.com/kt.prodhan' },
        {
          platform: 'github',
          url: 'https://github.com/Nafe-Ibne-Dalower ',
        },
        {
          platform: 'web',
          url: 'https://portfolio-of-nafe.web.app/',
        },
      ],
      post: 'Organizer',
      dept: "Batch '24",
      group: 6,
      roll: 12406106,
      email: 'ktprodhan@gmail.com',
    },
    {
      name: 'Adib Adnan Hoque',
      image_url: '/image/Developers/Adib.jpg',
      modal_image_url: '/image/Developers/tr-Adib.png',
      profile_url: [
        {
          platform: 'facebook',
          url: 'https://www.facebook.com/adibAdnanHoque',
        },
      ],
      post: 'Organizer',
      dept: "Batch '24",
      group: 6,
      roll: 12406078,
      email: 'adiblab22@gmail.com',
    },
  ],
  'FULL-STACK WEB DEVELOPERS': [
    {
      name: 'Wasef Rahman Swapnil',
      image_url: '/image/Developers/swapnil.jpg',
      modal_image_url: '/image/Developers/tr-swapnil.png',
      profile_url: [
        {
          platform: 'facebook',
          url: 'https://www.facebook.com/profile.php?id=100083625623282',
        },
        {
          platform: 'github',
          url: 'https://github.com/The-XENO-Studios/',
        },
        {
          platform: 'web',
          url: 'https://rafsanamin.epizy.com',
        },
        {
          platform: 'web',
          url: 'https://rafsanamin.epizy.com',
        },
      ],
      post: 'Member',
      dept: "Batch '25",
      group: 8,
      roll: 12508025,
      email: 'wasefrahmanswapnil@gmail.com',
    },
    {
      name: 'HRM Rafsan Amin',
      image_url: '/image/Developers/hrm_rafsan.jpg',
      modal_image_url: '/image/Developers/tr-hrm_rafsan.png',
      profile_url: [
        {
          platform: 'facebook',
          url: 'https://www.facebook.com/profile.php?id=100082305411559',
        },
        {
          platform: 'github',
          url: 'https://github.com/RafsanAmin',
        },
        {
          platform: 'web',
          url: 'https://xenostudios.vercel.app',
        },
      ],
      post: 'Member',
      dept: "Batch '25",
      group: 5,
      roll: 12505033,
      email: 'rafsanamin2020@gmail.com',
    },
  ],
  'FRONT-END WEB DEVELOPERS': [
    {
      name: 'Tahsan Hossain Niloy',
      image_url: '/image/Developers/Tahsan.jpg',
      modal_image_url: '/image/Developers/tr-Tahsan.png',
      imageInCenter: true,
      profile_url: [
        {
          platform: 'facebook',
          url: 'https://www.facebook.com/profile.php?id=61553035394735',
        },
      ],
      post: 'Member',
      dept: "Batch '25",
      group: 9,
      roll: 12509081,
      email: 'tahsanhossainniloy@gmail.com',
    },
    {
      name: 'Mansifur Rahman Rafsan',
      image_url: '/image/Developers/Rafsan.jpg',
      modal_image_url: '/image/Developers/tr-Rafsan.png',
      profile_url: [
        {
          platform: 'facebook',
          url: 'https://www.facebook.com/M.Rafsan06',
        },
      ],
      post: 'Member',
      dept: "Batch '25",
      group: 15,
      roll: 12515026,
      email: 'mansifurrahmanr.06@gmail.com',
    },
    {
      name: 'Redwanur Rahman',
      image_url: '/image/Developers/redwan.jpg',
      modal_image_url: '/image/Developers/tr-redwan.png',
      profile_url: [
        {
          platform: 'facebook',
          url: 'https://www.facebook.com/redwanur.rahaman.7',
        },
      ],
      post: 'Member',
      dept: "Batch '25",
      group: 16,
      roll: 12516038,
      email: 'redwanur2005@gmail.com',
    },
  ],
  'BACK-END WEB DEVELOPERS': [
    {
      name: 'Muksifur Rahman',
      image_url: '/image/Developers/muksif.jpg',
      modal_image_url: '/image/Developers/tr-muksif.png',
      profile_url: [
        {
          platform: 'facebook',
          url: 'https://www.facebook.com/muksifur',
        },
      ],
      post: 'Member',
      dept: "Batch '25",
      group: 5,
      roll: 12505096,
      email: 'muksifur@gmail.com',
    },
    {
      name: 'Mohammad Foisal',
      image_url: '/image/Developers/Foisal.jpg',
      modal_image_url: '/image/Developers/tr-Foisal.png',
      profile_url: [
        {
          platform: 'facebook',
          url: 'https://www.facebook.com/nurul.abbas.180',
        },
      ],
      post: 'Member',
      dept: "Batch '25",
      group: 5,
      roll: 12505055,
      email: 'abbasnurul805@gmail.com',
    },
  ],
};

export default x;
