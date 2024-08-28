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
  "MAIN DEVELOPER": [
    {
      name: "Wasef Rahman Swapnil",
      image_url: "/Images/Developers/swapnil.jpg",
      modal_image_url: "/Images/Developers/tr-swapnil.png",
      imageInCenter: true,
      profile_url: [
        {
          platform: "facebook",
          url: "https://www.facebook.com/profile.php?id=100083625623282",
        },
        {
          platform: "github",
          url: "https://github.com/The-XENO-Studios/",
        },
        {
          platform: "web",
          url: "https://xenostudios.vercel.app",
        },
      ],
      post: "Member",
      dept: "Batch '25",
      group: 8,
      roll: 12508025,
      email: "wasefrahmanswapnil@gmail.com",
    },
  ],
  "DESIGN DEVELOPER": [
    {
      name: "HRM Rafsan Amin",
      image_url: "/Images/Developers/hrm_rafsan.jpg",
      modal_image_url: "/Images/Developers/tr-hrm_rafsan.png",
      imageInCenter: false,
      profile_url: [
        {
          platform: "facebook",
          url: "https://www.facebook.com/profile.php?id=100082305411559",
        },
        {
          platform: "github",
          url: "https://github.com/RafsanAmin",
        },
        {
          platform: "web",
          url: "https://rafsanamin.epizy.com",
        },
      ],
      post: "Member",
      dept: "Batch '25",
      group: 5,
      roll: 12505033,
      email: "rafsanamin2020@gmail.com",
    },
  ],
};

export default x;
