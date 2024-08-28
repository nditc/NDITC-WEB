type setter = {
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

const x: setter[] = [
  {
    name: 'Emrul Chowdhury',
    image_url: '/Images/setters/Emrul Chowdhury.jpg',
    post: 'Software Development Engineer',
    dept: 'Amazon',
    profile_url: [],
  },
   {
    name: 'Zakir Hossain',
    image_url: '/Images/setters/Zakir Hossain.jpg',
    post: 'Associate Software Engineer',
    dept: 'Orbitax',
    profile_url: [],
  },
  {
    name: 'Sachin Deb',
    image_url: '/Images/setters/Sachin Deb.jpg',
    post: 'CSE',
    dept: 'BUET',
    profile_url: [],
  },
  {
    name: 'Fahim Khandakar',
    image_url: '/Images/setters/Fahim Khandakar.jpg',
    post: 'CSE',
    dept: 'University of Dhaka',
    profile_url: [],
  },
  {
    name: 'Ovishek Paul',
    image_url: '/Images/setters/Ovishek Paul.jpg',
    post: 'World Finalist',
    dept: 'ICPC',
    profile_url: [],
  },
  {
    name: 'Fahim Tajwar Saikat',
    image_url: '/Images/setters/Fahim Tajwar Saikat.png',
    post: 'World Finalist',
    dept: 'ICPC',
    profile_url: [],
  },
  {
    name: 'Saleque Bin Hossain Alif',
    image_url: '/Images/setters/Saleque Bin Hossain Alif.jpg',
    post: 'CSE',
    dept: 'KUET',
    profile_url: [],
  },
  {
    name: 'Srijon Kumar Mondal',
    image_url: '/Images/setters/Srijon Kumar Mondal.jpg',
    post: 'President',
    dept: 'Department of Programming, NDITC',
    profile_url: [],
  },
];

export default x;
