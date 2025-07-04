export type memberType = {
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

export type dbType = {
  heads: memberType[];
  sessions: {
    session: string;
    hasExtraDetails?: boolean;
    members: memberType[];
  }[];
};

const db: dbType = {
  heads: [
    {
      name: "Dr. Fr. Hemanto Pius Rozario, CSC",
      image_url:
        "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/heads/principal.jpg",
      profile_url: "",
      post: "Principal & Chief Patron",
    },
    {
      name: "Md. Ajimun Haque",
      image_url:
        "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/heads/moderator.jpg",
      profile_url: "",
      post: "Club Moderator",
    },
  ],
  sessions: [
    {
      session: "2024-2025",
      hasExtraDetails: true,
      members: [

        {
          name: "Muksifur Rahman",
          image_url: "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2024-2025/Muksifur Rahman.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2024-2025/Muksifur Rahman.png",
          profile_url: [
            { platform: "facebook", url: "https://www.facebook.com/muksifur" },
            { platform: "linkedin", url: "https://www.linkedin.com/in/muksifur/" },
            { platform: "github", url: "GitHub.com/muksifur" },
            { platform: "instagram", url: "instagram.com/muksifur" },
            { platform: "twitter", url: "X.com/muksifur" }
          ],
          post: "President",
          dept: "Department of Administration",
          group: 5,
          roll: 12505096,
          email: "muksifur@gmail.com",
          phone: "+8801786258009"
        },
        {
          name: "Priangshu Sutradhar",
          image_url: "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2024-2025/Priangshu Sutradhar.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2024-2025/Priangshu Sutradhar.png",
          profile_url: [],
          post: "Vice President",
          dept: "Department of Administration",
          group: 15,
          roll: 12515081,
          email: "ph2.sutradhar@gmail.com",
          phone: "+8801540779336"
        },
        {
          name: "Md. Abu Bakor Siddik Molla",
          image_url: "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2024-2025/Md. Abu Bakor Siddik Molla.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2024-2025/Md. Abu Bakor Siddik Molla.png",
          profile_url: [
            { platform: "facebook", url: "https://www.facebook.com/md.abu.bakar.siddik.974935" }
          ],
          post: "Secretary",
          dept: "Department of Administration",
          group: 3,
          roll: 12503084,
          email: "abubakarsiddik3084@gmail.com",
          phone: "+8801304369930"
        },
        {
          name: "Redwanur Rahaman",
          image_url: "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2024-2025/Redwanur Rahaman.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2024-2025/Redwanur Rahaman.png",
          profile_url: [
            { platform: "facebook", url: "https://www.facebook.com/R3DE0N" },
            { platform: "linkedin", url: "https://bd.linkedin.com/in/redwanurrahaman07" },
            { platform: "github", url: "https://github.com/Redwanur" }
          ],
          post: "President",
          dept: "Department of Archive, Workshop & Seminar",
          group: 16,
          roll: 12516038,
          email: "redwanur2005@gmail.com",
          phone: "+8801790390422"
        },
        {
          name: "Shuvojyoti Mondal",
          image_url: "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2024-2025/Shuvojyoti Mondal.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2024-2025/Shuvojyoti Mondal.png",
          profile_url: [
            { platform: "facebook", url: "https://www.facebook.com/shuvojyoti.mondal.73" },
          ],
          post: "Secretary",
          dept: "Department of Archive, Workshop & Seminar",
          group: 12,
          roll: 12512038,
          email: "noemailfound@gmail.com",
          phone: "+8801111111111"
        },
        {
          name: "Muttaqi Mahmood Choudhury",
          image_url: "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2024-2025/Muttaqi Mahmood Choudhury.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2024-2025/Muttaqi Mahmood Choudhury.png",
          profile_url: [
            { platform: "facebook", url: "https://www.facebook.com/muttaqi.mahmood" },
            { platform: "instagram", url: "https://www.instagram.com/mttaqui06/" }
          ],
          post: "President",
          dept: "Department of Logistics & Field Work",
          group: 3,
          roll: 12503061,
          email: "muttaqimc06@gmail.com",
          phone: "+8801790573465"
        },
        {
          name: "Md. Mostakim Ferdows",
          image_url: "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2024-2025/Md. Mostakim Ferdows.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2024-2025/Md. Mostakim Ferdows.png",
          profile_url: [
            { platform: "facebook", url: "https://www.facebook.com/mostakim.raduan/" }
          ],
          post: "Secretary",
          dept: "Department of Logistics & Fieldwork",
          group: 7,
          roll: 12507065,
          email: "mostakimraduan1639@gmail.com",
          phone: "+8801721928157"
        },
        {
          name: "Samin Yasar Alam",
          image_url: "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2024-2025/Samin Yasar Alam.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2024-2025/Samin Yasar Alam.png",
          profile_url: [
            { platform: "facebook", url: "https://www.facebook.com/Samin12504069" },
            { platform: "instagram", url: "https://www.instagram.com/_samin_4069/" },
            { platform: "twitter", url: "https://x.com/Samin_12504069?t=oNgBA4Q5vPDd1QVA4eREeg&s=09" }
          ],
          post: "President",
          dept: "Department of Photography & Videography",
          group: 4,
          roll: 12504069,
          email: "saminyasar705@gmail.com",
          phone: "+8801623804681"
        },
        {
          name: "Md Raad Sharar",
          image_url: "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2024-2025/Md Raad Sharar.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2024-2025/Md Raad Sharar.png",
          profile_url: [
            { platform: "facebook", url: "https://www.facebook.com/share/1BzBchv5VH/?mibextid=wwXIfr" }
          ],
          post: "Secretary",
          dept: "Department of Photography & Videography",
          group: 1,
          roll: 12501040,
          email: "raadsharar833@gmail.com",
          phone: "+8801780735430"
        },
        {
          name: "Wali E Zaman",
          image_url: "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2024-2025/Wali E Zaman.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2024-2025/Wali E Zaman.png",
          profile_url: [],
          post: "President",
          dept: "Department of Programming",
          group: 7,
          roll: 12507091,
          email: "waliezaman208@gmail.com",
          phone: "+8801973380329"
        },
        {
          name: "Kazi Nadid Hossain",
          image_url: "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2024-2025/Kazi Nadid Hossain.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2024-2025/Kazi Nadid Hossain.png",
          profile_url: [
            { platform: "facebook", url: "https://www.facebook.com/nadid.hossain.31#" }
          ],
          post: "Vice President",
          dept: "Department of Programming",
          group: 9,
          roll: 12509002,
          email: "nadid450hossain@gmail.com",
          phone: "+8801747926920"
        },
        {
          name: "Anol Dey Hrithik",
          image_url: "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2024-2025/Anol Dey Hrithik.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2024-2025/Anol Dey Hrithik.png",
          profile_url: [
            { platform: "facebook", url: "https://www.facebook.com/anol.dey.hrithik001" }
          ],
          post: "President",
          dept: "Department of Publications",
          group: 5,
          roll: 12505028,
          email: "anoldeyhrithik001@gmail.com",
          phone: "+8801986521023"
        },
        {
          name: "Aditya Sahariar Upal",
          image_url: "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2024-2025/Aditya Sahariar Upal.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2024-2025/Aditya Sahariar Upal.png",
          profile_url: [],
          post: "Secretary",
          dept: "Department of Publications",
          group: 17,
          roll: 12517100,
          email: "upal1418@gmail.com",
          phone: "+8801774027807"
        },
        {
          name: "Aldrin Dip Sarker",
          image_url: "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2024-2025/Aldrin Dip Sarker.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2024-2025/Aldrin Dip Sarker.png",
          profile_url: [
            { platform: "facebook", url: "https://www.facebook.com/aldrin.dip.sarker/" },
            { platform: "linkedin", url: "www.linkedin.com/in/aldrin-dip-sarker/" },
            { platform: "instagram", url: "https://www.instagram.com/aldrinium/" }
          ],
          post: "President",
          dept: "Department of Public Relations",
          group: 15,
          roll: 12515100,
          email: "sarkerdip420@gmail.com",
          phone: "+8801768142706"
        },
        {
          name: "Md.Abdullah Zuham",
          image_url: "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2024-2025/Md.Abdullah Zuham.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2024-2025/Md.Abdullah Zuham.png",
          profile_url: [
            { platform: "facebook", url: "https://www.facebook.com/share/1VhFkEDFJH/" }
          ],
          post: "Secretary",
          dept: "Department of Public Relations",
          group: 65,
          roll: 62565113,
          email: "zuhamabdullah50@gmail.com",
          phone: "+8801770997247"
        },
        {
          name: "Tahsan Hossain",
          image_url: "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2024-2025/Tahsan Hossain.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2024-2025/Tahsan Hossain.png",
          profile_url: [
            { platform: "facebook", url: "https://www.facebook.com/share/19MkupjQ58/" },
            { platform: "linkedin", url: "https://www.linkedin.com/in/tahsan-hossain-553900326?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
            { platform: "github", url: "https://github.com/northwind-13th" },
            { platform: "instagram", url: "https://www.instagram.com/__.niloy___?igsh=OWR6b2htbHhreWFm" }
          ],
          post: "President",
          dept: "Department of Quiz and Olympiad",
          group: 9,
          roll: 12509081,
          email: "tahsanhossainniloy@gmail.com",
          phone: "+8801842904719"
        },
        {
          name: "Mohammad Foisal",
          image_url: "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2024-2025/Mohammad Foisal.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2024-2025/Mohammad Foisal.png",
          profile_url: [
            { platform: "facebook", url: "https://www.facebook.com/md.foisal.1301" },
            { platform: "github", url: "https://github.com/Foisal1301" },
            { platform: "instagram", url: "https://www.instagram.com/foisal1301/" }
          ],
          post: "Secretary",
          dept: "Department of Quiz & Olympiad",
          group: 5,
          roll: 12505055,
          email: "abbasnurul805@gmail.com",
          phone: "+8801991946612"
        },
        {
          name: "Arko Chakrovortty",
          image_url: "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2024-2025/Arko Chakrovortty.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2024-2025/Arko Chakrovortty.png",
          profile_url: [
            { platform: "facebook", url: "https://www.facebook.com/I.Want.To.Be.A.Monke" },
            { platform: "linkedin", url: "https://www.linkedin.com/in/arko-chakrovortty-b55307333/" },
            { platform: "github", url: "https://github.com/IWantToBeAMonke" }
          ],
          post: "President",
          dept: "Department of Research & Development",
          group: 9,
          roll: 12509062,
          email: "arkochakrovortty@gmail.com",
          phone: "+8801719027495"
        },
        {
          name: "Chowdhury Mohammad Minhatullah",
          image_url: "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2024-2025/Chowdhury Mohammad Minhatullah.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2024-2025/Chowdhury Mohammad Minhatullah.png",
          profile_url: [],
          post: "President",
          dept: "Department of Robotics & AI",
          group: 17,
          roll: 12517006,
          email: "ifazchowdhury123@gmail.com",
          phone: "+8801847133391"
        },
        {
          name: "HRM Rafsan Amin",
          image_url: "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2024-2025/HRM Rafsan Amin.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2024-2025/HRM Rafsan Amin.png",
          profile_url: [
            { platform: "facebook", url: "https://www.facebook.com/hrm.rafsan.amin/" },
            { platform: "linkedin", url: "https://www.linkedin.com/in/hrm-rafsan-amin-25314a2bb/" },
            { platform: "github", url: "https://github.com/RafsanAmin/" },
            { platform: "instagram", url: "https://www.instagram.com/raf_coder/" }
          ],
          post: "President",
          dept: "Department of Web and App Development",
          group: 5,
          roll: 12505033,
          email: "rafsanamin2020@gmail.com",
          phone: "+8801713753930"
        },
        {
          name: "Mansifur Rahman Rafsan",
          image_url: "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2024-2025/Mansifur Rahman Rafsan.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2024-2025/Mansifur Rahman Rafsan.png",
          profile_url: [
            { platform: "facebook", url: "https://www.facebook.com/M.Rafsan06" },
            { platform: "linkedin", url: "https://www.linkedin.com/in/mansifur-rahman-rafsan-544670361/" }
          ],
          post: "Secretary",
          dept: "Department of Web and App Development",
          group: 15,
          roll: 12515026,
          email: "mansifurrahmanr.06@gmail.com",
          phone: "+8801882602018"
        },
        {
          name: "Abid Hossen",
          image_url: "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2024-2025/Abid Hossen.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2024-2025/Abid Hossen.png",
          profile_url: [
            { platform: "facebook", url: "https://www.facebook.com/abidhossen4321/" },
            { platform: "linkedin", url: "https://www.linkedin.com/in/abid-hossen/" },
            { platform: "github", url: "https://github.com/abid-hossen/" },
            { platform: "instagram", url: "https://www.instagram.com/abidhossen321/" },
            { platform: "twitter", url: "https://x.com/abidhossen4321/" }
          ],
          post: "Treasurer",
          dept: "",
          group: 62,
          roll: 62562081,
          email: "md.abidhossen4321@gmail.com",
          phone: "+8801739368060"
        },
        {
          name: "MD HASIN HASNAT",
          image_url: "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2024-2025/Md Hasin Hasnat.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2024-2025/MD HASIN HASNAT.png",
          profile_url: [
            { platform: "facebook", url: "www.facebook.com/hasin.hasnat.3" },
            { platform: "linkedin", url: "https://bd.linkedin.com/in/the-hasn-t-951957284" },
            { platform: "instagram", url: "www.instagram.com/hasin.hasnat.3" },
            { platform: "twitter", url: "https://x.com/Hasnat74072413" }
          ],
          post: "Executive Member",
          dept: "",
          group: 10,
          roll: 12510078,
          email: "hasinhasnat7@gmail.com",
          phone: "+8801580358302"
        },
        {
          name: "Arunavo Niloy",
          image_url: "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2024-2025/Arunavo Niloy.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2024-2025/Arunavo Niloy.png",
          profile_url: [],
          post: "Executive Member",
          dept: "",
          group: 0,
          roll: 12500000,
          email: "emailnotfound@gmail.com",
          phone: "+8801111111111"
        },

      ],
    },
    {
      session: "2023-2024",
      hasExtraDetails: true,
      members: [
        {
          name: "Shaikh Tasnim Iram",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2023-2024/Sheikh Tasnim Iram.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2023-2024/1.png",
          profile_url: [
            {
              platform: "facebook",
              url: "https://www.facebook.com/profile.php?id=100090141100551&mibextid=ZbWKwL",
            },
            {
              platform: "instagram",
              url: "https://www.instagram.com/tas_iram_",
            },
          ],
          post: "President",
          dept: "Department of Administration",
          group: 17,
          roll: 12417038,
          email: "iramtasnim209@gmail.com",
          phone: "+88 01972083039",
        },

        {
          name: "Fahim Haque",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2023-2024/Fahim Haque.jpg",
          modal_image_url: "/image/executives/2023-2024/2.png",
          profile_url: [
            {
              platform: "facebook",
              url: "http://www.facebook.com/fahim.haque.oishorjo",
            },
          ],
          post: "Secretary",
          dept: "Department of Administration",
          group: 8,
          roll: 12408095,
          email: "fahimhaque950@gmail.com",
          phone: "+88 01409704113",
        },

        {
          name: "Sheikh Sadat Shaleheen",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2023-2024/Sheikh Sadat Shaleheen.jpg",
          modal_image_url: "/image/executives/2023-2024/3.png",
          profile_url: [
            {
              platform: "facebook",
              url: "https://www.facebook.com/iah.yag?mibextid=ZbWKwL",
            },
          ],
          post: "President",
          dept: "Department of A.W.S",
          group: 2,
          roll: 42402002,
          email: "designclubs990@gmail.com",
          phone: "+88 01768950553",
        },

        {
          name: "S M Ataul Munim",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2023-2024/S M Ataul Munim.jpg",
          modal_image_url: "/image/executives/2023-2024/4.png",
          profile_url: [
            {
              platform: "facebook",
              url: "https://www.facebook.com/mdataul.munim.9",
            },
            {
              platform: "instagram",
              url: "https://www.instagram.com/eclipse_mnm",
            },
          ],
          post: "Secretary",
          dept: "Department of A.W.S",
          group: 4,
          roll: 62404016,
          email: "munim0067@gmail.com",
          phone: "+88 01533560262",
        },

        {
          name: "Md Iqtiar Uddin",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2023-2024/Md. Iqtiar Uddin Seeam.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2023-2024/5.png",
          profile_url: [
            {
              platform: "facebook",
              url: "https://www.facebook.com/md.iqtiar.uddin.siam",
            },
          ],
          post: "President",
          dept: "Department of Programming",
          group: 2,
          roll: 12402019,
          email: "mdiqtiaruddin20@gmail.com",
          phone: "+88 01827894812",
        },

        {
          name: "Maskawath Hossain Jim",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2023-2024/Maksawath Hossain Jim.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2023-2024/6.png",
          profile_url: [
            {
              platform: "facebook",
              url: "https://www.facebook.com/profile.php?id=100090194356458",
            },
          ],
          post: "Secretary",
          dept: "Department of Programming",
          group: 16,
          roll: 12416094,
          email: "maskawathhossain2005@gmail.com",
          phone: "+88 01621419326",
        },
        {
          name: "Inan Masud Aunan",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2023-2024/Inan Masud Aunan.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2023-2024/12.png",
          profile_url: [],
          post: "President",
          dept: "Department of Public Relations",
          group: 12,
          roll: 12412030,
          email: "",
          phone: "+88 01764575125",
        },

        {
          name: "Muntasir Mahmud",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2023-2024/Muntasir Mahmud.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2023-2024/13.png",
          profile_url: [
            {
              platform: "facebook",
              url: "https://www.facebook.com/profile.php?id=100086523572914&mibextid=ZbWKwL",
            },
          ],
          post: "Secretary",
          dept: "Department of Public Relations",
          group: 4,
          roll: 62404003,
          email: "muntasirprobi@gmail.com",
          phone: "+88 01978879002",
        },
        {
          name: "Adib Adnan Hoque",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2023-2024/Adib Adnan.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2023-2024/10.png",
          profile_url: [
            {
              platform: "facebook",
              url: "https://www.facebook.com/adibAdnanHoque",
            },
          ],
          post: "President",
          dept: "Department of Publications",
          group: 6,
          roll: 12406078,
          email: "adiblab22@gmail.com",
          phone: "+88 01978420145",
        },

        {
          name: "MD Zihad Hossain Simanto",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2023-2024/MD Zihad Hossain Simanto.jpeg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2023-2024/11.png",
          profile_url: [
            {
              platform: "facebook",
              url: "https://www.facebook.com/profile.php?id=100086492526471&mibextid=ZbWKwL",
            },
            {
              platform: "instagram",
              url: "https://www.instagram.com/axian.simon6t9/",
            },
          ],
          post: "Secretary",
          dept: "Department of Publications",
          group: 3,
          roll: 624030148,
          email: "Zihadhossainsimanto6t9@gmail.com",
          phone: "+88 01966532747",
        },

        {
          name: "Nayeem Islam Shanto",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2023-2024/Nayeem Islam Shanto.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2023-2024/9.png",
          profile_url: [],
          post: "President",
          dept: "Department of Robotics & AI",
          group: 16,
          roll: 12416104,
          email: "",
          phone: "+88 01301831480",
        },
        {
          name: "Nafe Ibne Dalower",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2023-2024/Nafe.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2023-2024/7.png",
          profile_url: [
            {
              platform: "facebook",
              url: "https://www.facebook.com/kt.prodhan/",
            },
            { platform: "web", url: "https://portfolio-of-nafe.web.app/" },
          ],
          post: "President",
          dept: "Web & App Development",
          group: 6,
          roll: 12406106,
          email: "ktprodhan@gmail.com",
          phone: "+88 01818993307",
        },

        {
          name: "Parvez M Salman Sami",
          image_url: "/image/executives/2023-2024/00.png",
          imageInCenter: true,
          modal_image_url: "/image/executives/2023-2024/0.png",
          profile_url: [
            {
              platform: "facebook",
              url: "http://fb.com/salman.sami.5525",
            },
          ],
          post: "Secretary",
          dept: "Web & App Development",
          group: 6,
          roll: 12406011,
          email: "cadetsalman2034@gmail.com",
          phone: "+88 01678052561",
        },

        {
          name: "Muntasir Sifat Dipto",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2023-2024/Muntasir Sifat Dipto.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2023-2024/14.png",
          profile_url: [],
          post: "Treasurer",
          group: 12,
          roll: 12412043,
          email: "",
          phone: "+88 01889727234",
        },

        {
          name: "Md. Rabbi Hasan",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2023-2024/Md. Rabbi Hasan.jpg",
          imageInCenter: true,
          modal_image_url: "/image/executives/2023-2024/15.png",
          profile_url: [
            {
              platform: "facebook",
              url: "https://www.facebook.com/rabbi.islam.798?mibextid=ZbWKwL",
            },
          ],
          post: "Executive Member",
          group: 7,
          roll: 12407040,
          email: "rabbi01903837819@gmail.com",
          phone: "+88 01903837819",
        },
      ],
    },
    {
      session: "2022-2023",
      hasExtraDetails: true,
      members: [
        {
          name: "Abdullah Rafid",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/1.jpg",
          modal_image_url: "/image/executives/2022-2023/1.png",
          profile_url: [
            { platform: "facebook", url: "https://www.facebook.com/smrt.nerd" },
          ],
          post: "President",
          dept: "Department of Administration",
          group: 6,
          roll: 12306001,
          email: "rafidabdullah1@gmail.com",
          phone: "+88 01793471625",
        },
        {
          name: "Irfan Hossain Rafi",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/2.jpg",
          modal_image_url: "/image/executives/2022-2023/2.png",
          profile_url: [
            {
              platform: "facebook",
              url: "https://www.facebook.com/profile.php?id=100074975167067",
            },
          ],
          post: "Vice President",
          dept: "Department of Administration",
          group: 6,
          roll: 12306003,
          email: "rafehossain9@gmail.com",
          phone: "+88 01706967613",
        },
        {
          name: "Md. Mahmudunnobi",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/3.jpg",
          modal_image_url: "/image/executives/2022-2023/3.png",
          profile_url: [
            {
              platform: "facebook",
              url: "https://www.facebook.com/mahmud.s.13",
            },
          ],
          post: "Secretary",
          dept: "Department of Administration",

          group: 13,
          roll: 12313114,
          email: "mahmudunnobi4@gmail.com",
          phone: "+88 01970122430",
        },
        {
          name: "Sabyasachi Ghosh",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/4.jpg",
          modal_image_url: "/image/executives/2022-2023/4.png",
          profile_url: [
            {
              platform: "facebook",
              url: "https://www.facebook.com/sabyasachi.ghosh.bd",
            },
          ],
          post: "President",
          dept: "Department of A.W.S",
          group: 15,
          roll: 12315126,
          email: "sabyasachi1317@gmail.com",
          phone: "+88 01747978705",
        },
        {
          name: "Khaled Mahmud Riad",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/5.jpg",
          modal_image_url: "/image/executives/2022-2023/5.png",
          profile_url: [
            {
              platform: "facebook",
              url: "https://www.facebook.com/ohaiyo.mirza?mibextid=ZbWKwL",
            },
          ],
          post: "Secretary",
          dept: "Department of A.W.S",
          group: 7,
          roll: 12307001,
          email: "khaledmahmudriad24@gmail.com",
          phone: "+88 01518901541",
        },
        {
          name: "Srijon Kumar Mondal",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/6.jpg",
          modal_image_url: "/image/executives/2022-2023/6.png",
          imageInCenter: true,
          profile_url: [
            {
              platform: "facebook",
              url: "https://www.facebook.com/srijon777xx",
            },
          ],
          post: "President",
          dept: "Department of Programming",
          group: 2,
          roll: 12302012,
          email: "srijonkumar18@gmail.com",
          phone: "+88 01308621205",
        },
        {
          name: "Shahtaz Rahman Labib",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/7.jpg",
          modal_image_url: "/image/executives/2022-2023/7.png",
          profile_url: [
            {
              platform: "facebook",
              url: "https://www.facebook.com/shahtaz.shahtazrahman",
            },
          ],
          post: "Secretary",
          dept: "Department of Programming",
          group: 12,
          roll: 12312086,
          email: "srlabib99@gmail.com",
          phone: "+88 01840877652",
        },
        {
          name: "Nazmus Tahsan",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/8.jpg",
          modal_image_url: "/image/executives/2022-2023/8.png",
          profile_url: [
            {
              platform: "facebook",
              url: "https://www.facebook.com/NazmusTahsan48",
            },
          ],
          post: "President",
          dept: "Department of Public Relations",
          group: 15,
          roll: 12315048,
          email: "nazmustahsan@gmail.com",
          phone: "+88 01730888148",
        },
        {
          name: "Arko Chowdhury",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/9.jpg",
          modal_image_url: "/image/executives/2022-2023/9.png",
          profile_url: [
            {
              platform: "facebook",
              url: "https://www.facebook.com/arko.chowdhury.121",
            },
          ],
          post: "Secretary",
          dept: "Department of Public Relations",
          group: 10,
          roll: 12310111,
          email: "chowdhuryarko084@gmail.com",
          phone: "+88 01648947457",
        },
        {
          name: "Badruddoza Kaif",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/10.jpg",
          modal_image_url: "/image/executives/2022-2023/10.png",
          profile_url: [
            { platform: "facebook", url: "https://www.facebook.com/bokaif" },
          ],
          post: "President",
          dept: "Department of Publications",
          group: 16,
          roll: 12316070,
          email: "chiki.monk3y@gmail.com",
          phone: "+88 01846945836",
        },
        {
          name: "Tahsin Ahmed",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/11.jpg",
          modal_image_url: "/image/executives/2022-2023/11.png",
          profile_url: [
            {
              platform: "facebook",
              url: "https://www.facebook.com/girgiti.ofc",
            },
          ],
          post: "Vice President",
          dept: "Department of Publications",
          group: 8,
          roll: 12308032,
          email: "g.tahsinahmed@gmail.com",
          phone: "+88 01309990164",
        },
        {
          name: "Snigdho Roy",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/12.jpg",
          modal_image_url: "/image/executives/2022-2023/12.png",
          profile_url: [
            {
              platform: "facebook",
              url: "https://www.facebook.com/snigdho.roy.5268",
            },
          ],
          post: "Secretary",
          dept: "Department of Publications",
          group: 2,
          roll: 12302108,
          email: "snigdho_roy@yahoo.com",
          phone: "+88 01306700479",
        },
        {
          name: "Md. Al Mahin Bin Hasan",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/13.jpg",
          modal_image_url: "/image/executives/2022-2023/13.png",
          profile_url: [
            {
              platform: "facebook",
              url: "https://www.facebook.com/mahinsu57sme",
            },
          ],
          post: "President",
          dept: "Department of Robotics & AI",
          group: 14,
          roll: 12314097,
          email: "allmahin149@gmail.com",
          phone: "+88 01611092225",
        },
        {
          name: "Sahidul Hasan Rahi",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/14.jpg",
          modal_image_url: "/image/executives/2022-2023/14.png",
          profile_url: [
            {
              platform: "facebook",
              url: "https://www.facebook.com/sahidul.rahi",
            },
          ],
          post: "Secretary",
          dept: "Department of Robotics & AI",
          group: 8,
          roll: 12308039,
          email: "darkr3650@gmail.com",
          phone: "+88 01538007022",
        },
        {
          name: "Ahammad Shawki",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/15.jpg",
          modal_image_url: "/image/executives/2022-2023/15.png",
          profile_url: [
            {
              platform: "facebook",
              url: "https://www.facebook.com/ahammadshawki8/",
            },
            {
              platform: "github",
              url: "https://github.com/ahammadshawki8/",
            },
            {
              platform: "web",
              url: "https://ahammadshawki8.github.io/",
            },
          ],
          post: "President",
          dept: "Web & App Development",
          group: 5,
          roll: 12305042,
          email: "ahammadshawki8@gmail.com",
          phone: "+88 01946821177",
        },
        {
          name: "Md. Naimur Rahman",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/16.jpg",
          modal_image_url: "/image/executives/2022-2023/16.png",
          profile_url: [
            {
              platform: "facebook",
              url: "https://www.facebook.com/mdnaimur020",
            },
            {
              platform: "github",
              url: "https://github.com/mdnaimur0",
            },
            {
              platform: "web",
              url: "https://mdnaimur0.github.io/",
            },
          ],
          post: "Secretary",
          dept: "Web & App Development",
          group: 4,
          roll: 12304096,
          email: "mdnaimur020@gmail.com",
          phone: "+88 01940289890",
        },
        {
          name: "Abdullah Al Fahme",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/17.jpg",
          modal_image_url: "/image/executives/2022-2023/17.png",
          profile_url: [
            {
              platform: "facebook",
              url: "https://www.facebook.com/ahmed.rafan.923",
            },
          ],
          post: "Treasurer",
          group: 5,
          roll: 12305078,
          email: "fahmeabdullah091@gmail.com",
          phone: "+88 01890661953",
        },
        {
          name: "Bakhtiar Hossain",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/18.jpg",
          modal_image_url: "/image/executives/2022-2023/18.png",
          profile_url: [
            {
              platform: "facebook",
              url: "https://www.facebook.com/bakhtiar.hossain.5811",
            },
          ],
          post: "Executive Member",
          group: 15,
          roll: 12315130,
          email: "hossainbakhtiar07@gmail.com",
          phone: "+88 01518937277",
        },
        {
          name: "Shaikh Mohammad Moballig",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/19.jpg",
          modal_image_url: "/image/executives/2022-2023/19.png",
          profile_url: [
            {
              platform: "facebook",
              url: "https://www.facebook.com/moballig.148",
            },
          ],
          post: "Executive Member",
          group: 13,
          roll: 12313125,
          email: "moballig148@gmail",
          phone: "+88 01789868880",
        },
      ],
    },
    {
      session: "2021-2022",
      members: [
        {
          name: "Hasibur Rahman Touhid",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2021-2022/1.jpg",
          profile_url: "",
          post: "President",
          dept: "Department of Administration",
        },
        {
          name: "Md Eyamin Hossan Molla",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2021-2022/2.jpg",
          profile_url: "",
          post: "Secretary",
          dept: "Department of Administration",
        },
        {
          name: "Abdul Basit Tonmoy",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2021-2022/3.jpg",
          profile_url: "",
          post: "President",
          dept: "Department of A.W.S",
        },
        {
          name: "Sk. Shafin Ahmad",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2021-2022/4.jpg",
          profile_url: "",
          post: "Secretary",
          dept: "Department of A.W.S",
        },

        {
          name: "Saom Bin Khaled",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2021-2022/7.jpg",
          profile_url: "",
          post: "President",
          dept: "Department of Programming",
        },
        {
          name: "Ihasan Iftekhar Labib",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2021-2022/8.jpg",
          profile_url: "",
          post: "Secretary",
          dept: "Department of Programming",
        },
        {
          name: "Farhan Ishraq",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2021-2022/11.jpg",
          profile_url: "",
          post: "President",
          dept: "Department of Public Relations",
        },
        {
          name: "Azmain Muksit Anam",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2021-2022/12.jpg",
          profile_url: "",
          post: "Secretary",
          dept: "Department of Public Relations",
        },
        {
          name: "Abu Bakar Siddique",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2021-2022/9.jpg",
          profile_url: "",
          post: "President",
          dept: "Department of Publications",
        },
        {
          name: "Rafsan Jani Bin Islam",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2021-2022/10.jpg",
          profile_url: "",
          post: "Secretary",
          dept: "Department of Publications",
        },

        {
          name: "Md. Ashrafuzzaman Fuad",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2021-2022/13.jpg",
          profile_url: "",
          post: "President",
          dept: "Department of Robotics",
        },

        {
          name: "Khalid Ahammed Uzzal",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2021-2022/14.jpg",
          profile_url: "",
          post: "President",
          dept: "Web & App Development",
        },
        {
          name: "Farhan Ishrak",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2021-2022/15.jpg",
          profile_url: "",
          post: "Treasurer",
          dept: null,
        },
        {
          name: "Sourov Das",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2021-2022/5.jpg",
          profile_url: "",
          post: "Executive Member",
          dept: null,
        },
        {
          name: "Mirza Ahmed Al Mehedi",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2021-2022/6.jpg",
          profile_url: "",
          post: "Executive Member",
          dept: null,
        },
      ],
    },
    {
      session: "2020-2021",
      members: [
        {
          name: "Kowsar Ansary",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2020-2021/1.jpg",
          profile_url: "https://www.facebook.com/kowsar.ansary",
          post: "President",
          dept: "Department of Administration",
        },
        {
          name: "Faiaz Azmain",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2020-2021/2.jpg",
          profile_url: "https://www.facebook.com/faiazmain",
          post: "Secretary",
          dept: "Department of Administration",
        },
        {
          name: "Shahran Hossain",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2020-2021/3.jpg",
          profile_url: "https://www.facebook.com/shahran.hossain",
          post: "President",
          dept: "Department of A.W.S",
        },
        {
          name: "Sharar Ahmad",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2020-2021/4.jpg",
          profile_url: "https://www.facebook.com/sharar.ahmad.50",
          post: "Secretary",
          dept: "Department of A.W.S",
        },

        {
          name: "Saleque Bin Hossain",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2020-2021/7.jpg",
          profile_url: "https://www.facebook.com/sm.saleque",
          post: "President",
          dept: "Department of Programming",
        },
        {
          name: "Sadek Hossain Asif",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2020-2021/8.jpg",
          profile_url: "https://www.facebook.com/asif.sadek.39",
          post: "Secretary",
          dept: "Department of Programming",
        },
        {
          name: "Tausif Muntak Tasin",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2020-2021/11.jpg",
          profile_url: "https://www.facebook.com/tausifmuntak.tasin",
          post: "President",
          dept: "Department of Public Relations",
        },
        {
          name: "Ahmed Jubyer",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2020-2021/12.jpg",
          profile_url: "https://www.facebook.com/ahmed.jubyer.1102",
          post: "Secretary",
          dept: "Department of Public Relations",
        },
        {
          name: "Faiyad Hossain Sowad",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2020-2021/9.jpg",
          profile_url: "https://www.facebook.com/fhsowad",
          post: "President",
          dept: "Department of Publications",
        },
        {
          name: "Aniruddha Chisim",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2020-2021/10.jpg",
          profile_url: "https://www.facebook.com/ruddha.chisim",
          post: "Secretary",
          dept: "Department of Publications",
        },

        {
          name: "Shahriyar Haris",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2020-2021/13.jpg",
          profile_url: "https://www.facebook.com/shahriyar.haris.9",
          post: "President",
          dept: "Department of Robotics",
        },
        {
          name: "Nafis Mahmud",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2020-2021/14.jpg",
          profile_url: "https://www.facebook.com/NafisTheGr8",
          post: "Secretary",
          dept: "Department of Robotics",
        },
        {
          name: "Asif Alamgir",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2020-2021/15.jpg",
          profile_url: "https://www.facebook.com/asif.alamgir.710",
          post: "Treasurer",
          dept: null,
        },
        {
          name: "Arman Ferdous",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2020-2021/5.jpg",
          profile_url:
            "https://www.facebook.com/profile.php?id=100011664880404",
          post: "Executive Member",
          dept: null,
        },
        {
          name: "J.M. Areeb Uzair",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2020-2021/6.jpg",
          profile_url: "",
          post: "Executive Member",
          dept: null,
        },
      ],
    },
    {
      session: "2019-2020",
      members: [
        {
          name: "Fahim Murshed",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2019-2020/3.jpg",
          profile_url: "https://www.facebook.com/rabby.fahimmurshed.3",
          post: "President",
          dept: "Department of Administration",
        },

        {
          name: "Mashfiqun Nabi",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2019-2020/9.jpg",
          profile_url: "https://www.facebook.com/mashfiqun.nabi",
          post: "Secretary",
          dept: "Department of Administration",
        },
        {
          name: "Hrithik Deb",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2019-2020/4.jpg",
          profile_url: "https://www.facebook.com/gs.hrithik",
          post: "President",
          dept: "Department of A.W.S",
        },
        {
          name: "Hashibul Sharon",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2019-2020/10.jpg",
          profile_url: "https://www.facebook.com/hashibulsharon",
          post: "Secretary",
          dept: "Department of A.W.S",
        },
        {
          name: "Chowdhury Isfatul Karim",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2019-2020/1.jpg",
          profile_url: "https://www.facebook.com/isfatul.karim",
          post: "President",
          dept: "Department of Programming",
        },
        {
          name: "Nazib Abrar",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2019-2020/7.jpg",
          profile_url: "https://www.facebook.com/abrar.nirjh0r",
          post: "Secretary",
          dept: "Department of Programming",
        },
        {
          name: "Noor Mohammad Rifat",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2019-2020/5.jpg",
          profile_url: "https://www.facebook.com/nm.rifat.925",
          post: "President",
          dept: "Department of Public Relations",
        },
        {
          name: "Mostofa Mohiuddin",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2019-2020/11.jpg",
          profile_url: "https://www.facebook.com/eshan.ahmed.758737",
          post: "Secretary",
          dept: "Department of Public Relations",
        },
        {
          name: "Aritra Arka Sarkar",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2019-2020/6.jpg",
          profile_url: "https://www.facebook.com/ardour.arcturus",
          post: "President",
          dept: "Department of Publications",
        },
        {
          name: "Zuhayer Md. Ajmain Hoque",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2019-2020/12.jpg",
          profile_url: "",
          post: "Secretary",
          dept: "Department of Publications",
        },
        {
          name: "Hamidur Rahman Khan",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2019-2020/2.jpg",
          profile_url: "https://www.facebook.com/hamidur.rk",
          post: "President",
          dept: "Department of Robotics",
        },
        {
          name: "Shihab Sarar Ahmed",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2019-2020/8.jpg",
          profile_url: "https://www.facebook.com/shihabsarar29",
          post: "Secretary",
          dept: "Department of Robotics",
        },
        {
          name: "Takbir Hossain Rudro",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2019-2020/13.jpg",
          profile_url: "",
          post: "Treasurer",
          dept: null,
        },
        {
          name: "Abir Hasan Rohan",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2019-2020/14.jpg",
          profile_url: "https://www.facebook.com/ahr627",
          post: "Executive Member",
          dept: null,
        },
      ],
    },
    {
      session: "2018-2019",
      members: [
        {
          name: "Intiser Rajoan Parash",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/1.jpg",
          profile_url: "https://www.facebook.com/intiserx",
          post: "General Secretary",
          dept: null,
        },
        {
          name: "Saran Debnath",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/2.jpg",
          profile_url:
            "https://www.facebook.com/profile.php?id=100036123218909",
          post: "Associate General Secratary",
          dept: null,
        },
        {
          name: "Mir Mashrafi Alam",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/3.jpg",
          profile_url: "https://www.facebook.com/mashrafi.alam.97",
          post: "Joint Secretary",
          dept: null,
        },
        {
          name: "Rahib Elias",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/4.jpg",
          profile_url: "https://www.facebook.com/rahib.elias",
          post: "Treasurer",
          dept: null,
        },
        {
          name: "Naim Rahaman",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/5.jpg",
          profile_url: "",
          post: "Secretary [Publication]",
          dept: null,
        },
        {
          name: "Fazle Ruhan",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/6.jpg",
          profile_url: "https://www.facebook.com/md.ruhan.9237",
          post: "Secretary [Public Relation]",
          dept: null,
        },
        {
          name: "Aminul Islam Miraz",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/7.jpg",
          profile_url: "https://www.facebook.com/aminulislam.miraz.3",
          post: "Secretary [A.W.S.]",
          dept: null,
        },
        {
          name: "Al Mubin Nabil",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/8.jpg",
          profile_url: "https://www.facebook.com/almubin.nabil",
          post: "Secretary [Robotics]",
          dept: null,
        },
        {
          name: "Sumit Alam Khan",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/9.jpg",
          profile_url:
            "https://www.facebook.com/profile.php?id=100010422460989",
          post: "Secretary [Programming]",
          dept: null,
        },
        {
          name: "Hasibul Hasan Ahmed",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/10.jpg",
          profile_url: "https://www.facebook.com/hasibul.hasan.5283",
          post: "Associate Secretary [Publication]",
          dept: null,
        },
        {
          name: "Farhan Rahman Fahim",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/11.jpg",
          profile_url: "",
          post: "Associate Secretary [Publication]",
          dept: null,
        },
        {
          name: "Jubaidul Jobaer Rakib",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/12.jpg",
          profile_url: "",
          post: "Associate Secretary [Public Relation]",
          dept: null,
        },
        {
          name: "Ahmed Atif Abrar",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/13.jpg",
          profile_url: "https://www.facebook.com/ahmed.atifabrar",
          post: "Associate Secretary [Public Relation]",
          dept: null,
        },
        {
          name: "Sabbir Ahmed Khan",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/14.jpg",
          profile_url: "https://www.facebook.com/sabbirahmedkhan19",
          post: "Associate Secretary [A.W.S.]",
          dept: null,
        },
        {
          name: "Al Imran Sonet",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/15.jpg",
          profile_url: "https://www.facebook.com/alimran.sonet.79",
          post: "Associate Secretary [A.W.S.]",
          dept: null,
        },
        {
          name: "Arban Hossain",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/16.jpg",
          profile_url: "https://www.facebook.com/liquidicalpants",
          post: "Associate Secretary [Robotics]",
          dept: null,
        },
        {
          name: "Shantanu Rahman",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/17.jpg",
          profile_url: "https://www.facebook.com/shantanu.nerd",
          post: "Associate Secretary [Programming]",
          dept: null,
        },
        {
          name: "Fahim Hossain",
          image_url:
            "https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/18.jpg",
          profile_url: "https://www.facebook.com/fahimhossain.sahil",
          post: "Executive Member",
          dept: null,
        },
      ],
    },
  ],
};
export default db;
