export const developerData: DeveloperDataFormat[] = [
  {
    name: "Tahsan Hossain Niloy",
    imageURL: "https://i.postimg.cc/0Nf1msBC/IMG-20231022-162447.jpg",
    imageInCenter: true,
    profileURL: "https://www.facebook.com/profile.php?id=61553035394735",
    designation: "Member",
    department: "Batch '25",
  },
  {
    name: "Mansifur Rahman Rafsan",
    imageURL: "/image/Developers/Rafsan.jpg",
    profileURL: "https://www.facebook.com/M.Rafsan06",
    designation: "Member",
    department: "Batch '25",
  },
  {
    name: "Redwanur Rahman",
    imageURL: "/image/Developers/redwan.jpg",
    profileURL: "https://www.facebook.com/redwanur.rahaman.7",
    designation: "Member",
    department: "Batch '25",
  },
];

interface DeveloperDataFormat {
  name: string;
  imageURL: string;
  imageInCenter?: boolean;
  profileURL: string;
  designation: string;
  department: string;
}
