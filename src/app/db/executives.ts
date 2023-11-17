export type memberType = {
  name: string;
  image_url: string;
  profile_url?: string;
  post: string;
  dept?: string | null;
};

export type dbType = {
  heads: memberType[];
  sessions: {
    session: string;
    members: memberType[];
  }[];
};

const db: dbType = {
  heads: [
    {
      name: 'Dr. Fr. Hemanto Pius Rozario, CSC',
      image_url:
        'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/heads/principal.jpg',
      profile_url: '',
      post: 'Principal & Cheif Patron',
    },
    {
      name: 'Dr. Fr. Leonard Shankar Rozario, CSC',
      image_url:
        'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/heads/dr-fr-lenard-shankar-rozario-csc.jpg',
      profile_url: '',
      post: 'Vice Principal & Club Co-ordinator',
    },
    {
      name: 'Saikat Lawrence Rozario',
      image_url:
        'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/heads/saikatsir1.JPG',
      profile_url: '',
      post: 'Club Moderator',
    },
  ],
  sessions: [
    {
      session: '2022-2023',
      members: [
        {
          name: 'Abdullah Rafid',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/1.jpg',
          profile_url: 'https://www.facebook.com/smrt.nerd',
          post: 'President',
          dept: 'Department of Administration',
        },
        {
          name: 'Irfan Hossain Rafi',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/2.jpg',
          profile_url: 'https://www.facebook.com/profile.php?id=100074975167067',
          post: 'Vice President',
          dept: 'Department of Administration',
        },
        {
          name: 'Md. Mahmudunnobi',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/3.jpg',
          profile_url: 'https://www.facebook.com/mahmud.s.13',
          post: 'Secretary',
          dept: 'Department of Administration',
        },
        {
          name: 'Sabyasachi Ghosh',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/4.jpg',
          profile_url: 'https://www.facebook.com/sabyasachi.ghosh.bd',
          post: 'President',
          dept: 'Department of A.W.S',
        },
        {
          name: 'Khaled Mahmud Riad',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/5.jpg',
          profile_url: 'https://www.facebook.com/ohaiyo.mirza?mibextid=ZbWKwL',
          post: 'Secretary',
          dept: 'Department of A.W.S',
        },
        {
          name: 'Srijon Kumar Mondal',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/6.jpg',
          profile_url: 'https://www.facebook.com/srijon777xx',
          post: 'President',
          dept: 'Department of Programming',
        },
        {
          name: 'Shahtaz Rahman Labib',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/7.jpg',
          profile_url: 'https://www.facebook.com/shahtaz.shahtazrahman',
          post: 'Secretary',
          dept: 'Department of Programming',
        },
        {
          name: 'Nazmus Tahsan',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/8.jpg',
          profile_url: 'https://www.facebook.com/NazmusTahsan48',
          post: 'President',
          dept: 'Department of Public Relations',
        },
        {
          name: 'Arko Chowdhury',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/9.jpg',
          profile_url: 'https://www.facebook.com/arko.chowdhury.121',
          post: 'Secretary',
          dept: 'Department of Public Relations',
        },
        {
          name: 'Badruddoza Kaif',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/10.jpg',
          profile_url: 'https://www.facebook.com/bokaif',
          post: 'President',
          dept: 'Department of Publications',
        },
        {
          name: 'Tahsin Ahmed',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/11.jpg',
          profile_url: 'https://www.facebook.com/girgiti.ofc',
          post: 'Vice President',
          dept: 'Department of Publications',
        },
        {
          name: 'Snigdho Roy',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/12.jpg',
          profile_url: 'https://www.facebook.com/snigdho.roy.5268',
          post: 'Secretary',
          dept: 'Department of Publications',
        },
        {
          name: 'Md. Al Mahin Bin Hasan',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/13.jpg',
          profile_url: 'https://www.facebook.com/root.mahin',
          post: 'President',
          dept: 'Department of Robotics & AI',
        },
        {
          name: 'Sahidul Hasan Rahi',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/14.jpg',
          profile_url: 'https://www.facebook.com/sahidul.rahi',
          post: 'Secretary',
          dept: 'Department of Robotics & AI',
        },
        {
          name: 'Ahammad Shawki',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/15.jpg',
          profile_url: 'https://www.facebook.com/ahammadshawki8/',
          post: 'President',
          dept: 'Web & App Development',
        },
        {
          name: 'Md. Naimur Rahman',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/16.jpg',
          profile_url: 'https://www.facebook.com/mdnaimur020',
          post: 'Secretary',
          dept: 'Web & App Development',
        },
        {
          name: 'Abdullah Al Fahme',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/17.jpg',
          profile_url: 'https://www.facebook.com/ahmed.rafan.923',
          post: 'Treasurer',
        },
        {
          name: 'Bakhtiar Hossain',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/18.jpg',
          profile_url: 'https://www.facebook.com/bakhtiar.hossain.5811',
          post: 'Executive Member',
        },
        {
          name: 'Shaikh Mohammad Moballig',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2022-2023/19.jpg',
          profile_url: 'https://www.facebook.com/moballig.148',
          post: 'Executive Member',
        },
      ],
    },
    {
      session: '2021-2022',
      members: [
        {
          name: 'Hasibur Rahman Touhid',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2021-2022/1.jpg',
          profile_url: '',
          post: 'President',
          dept: 'Department of Administration',
        },
        {
          name: 'Md Eyamin Hossan Molla',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2021-2022/2.jpg',
          profile_url: '',
          post: 'Secretary',
          dept: 'Department of Administration',
        },
        {
          name: 'Abdul Basit Tonmoy',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2021-2022/3.jpg',
          profile_url: '',
          post: 'President',
          dept: 'Department of A.W.S',
        },
        {
          name: 'Sk. Shafin Ahmad',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2021-2022/4.jpg',
          profile_url: '',
          post: 'Secretary',
          dept: 'Department of A.W.S',
        },
        {
          name: 'Sourov Das',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2021-2022/5.jpg',
          profile_url: '',
          post: 'Executive Member',
          dept: null,
        },
        {
          name: 'Mirza Ahmed Al Mehedi',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2021-2022/6.jpg',
          profile_url: '',
          post: 'Executive Member',
          dept: null,
        },
        {
          name: 'Saom Bin Khaled',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2021-2022/7.jpg',
          profile_url: '',
          post: 'President',
          dept: 'Department of Programming',
        },
        {
          name: 'Ihasan Iftekhar Labib',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2021-2022/8.jpg',
          profile_url: '',
          post: 'Secretary',
          dept: 'Department of Programming',
        },
        {
          name: 'Abu Bakar Siddique',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2021-2022/9.jpg',
          profile_url: '',
          post: 'President',
          dept: 'Department of Publications',
        },
        {
          name: 'Rafsan Jani Bin Islam',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2021-2022/10.jpg',
          profile_url: '',
          post: 'Secretary',
          dept: 'Department of Publications',
        },
        {
          name: 'Farhan Ishraq',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2021-2022/11.jpg',
          profile_url: '',
          post: 'President',
          dept: 'Department of Public Relations',
        },
        {
          name: 'Azmain Muksit Anam',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2021-2022/12.jpg',
          profile_url: '',
          post: 'Secretary',
          dept: 'Department of Public Relations',
        },
        {
          name: 'Md. Ashrafuzzaman Fuad',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2021-2022/13.jpg',
          profile_url: '',
          post: 'President',
          dept: 'Department of Robotics',
        },
        {
          name: 'Khalid Ahammed Uzzal',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2021-2022/14.jpg',
          profile_url: '',
          post: 'President',
          dept: 'Web & App Development',
        },
        {
          name: 'Farhan Ishrak',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2021-2022/15.jpg',
          profile_url: '',
          post: 'Treasurer',
          dept: null,
        },
      ],
    },
    {
      session: '2020-2021',
      members: [
        {
          name: 'Kowsar Ansary',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2020-2021/1.jpg',
          profile_url: 'https://www.facebook.com/kowsar.ansary',
          post: 'President',
          dept: 'Department of Administration',
        },
        {
          name: 'Faiaz Azmain',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2020-2021/2.jpg',
          profile_url: 'https://www.facebook.com/faiazmain',
          post: 'Secretary',
          dept: 'Department of Administration',
        },
        {
          name: 'Shahran Hossain',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2020-2021/3.jpg',
          profile_url: 'https://www.facebook.com/shahran.hossain',
          post: 'President',
          dept: 'Department of A.W.S',
        },
        {
          name: 'Sharar Ahmad',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2020-2021/4.jpg',
          profile_url: 'https://www.facebook.com/sharar.ahmad.50',
          post: 'Secretary',
          dept: 'Department of A.W.S',
        },
        {
          name: 'Arman Ferdous',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2020-2021/5.jpg',
          profile_url: 'https://www.facebook.com/profile.php?id=100011664880404',
          post: 'Executive Member',
          dept: null,
        },
        {
          name: 'J.M. Areeb Uzair',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2020-2021/6.jpg',
          profile_url: '',
          post: 'Executive Member',
          dept: null,
        },
        {
          name: 'Saleque Bin Hossain',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2020-2021/7.jpg',
          profile_url: 'https://www.facebook.com/sm.saleque',
          post: 'President',
          dept: 'Department of Programming',
        },
        {
          name: 'Sadek Hossain Asif',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2020-2021/8.jpg',
          profile_url: 'https://www.facebook.com/asif.sadek.39',
          post: 'Secretary',
          dept: 'Department of Programming',
        },
        {
          name: 'Faiyad Hossain Sowad',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2020-2021/9.jpg',
          profile_url: 'https://www.facebook.com/fhsowad',
          post: 'President',
          dept: 'Department of Publications',
        },
        {
          name: 'Aniruddha Chisim',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2020-2021/10.jpg',
          profile_url: 'https://www.facebook.com/ruddha.chisim',
          post: 'Secretary',
          dept: 'Department of Publications',
        },
        {
          name: 'Tausif Muntak Tasin',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2020-2021/11.jpg',
          profile_url: 'https://www.facebook.com/tausifmuntak.tasin',
          post: 'President',
          dept: 'Department of Public Relations',
        },
        {
          name: 'Ahmed Jubyer',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2020-2021/12.jpg',
          profile_url: 'https://www.facebook.com/ahmed.jubyer.1102',
          post: 'Secretary',
          dept: 'Department of Public Relations',
        },
        {
          name: 'Shahriyar Haris',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2020-2021/13.jpg',
          profile_url: 'https://www.facebook.com/shahriyar.haris.9',
          post: 'President',
          dept: 'Department of Robotics',
        },
        {
          name: 'Nafis Mahmud',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2020-2021/14.jpg',
          profile_url: 'https://www.facebook.com/NafisTheGr8',
          post: 'Secretary',
          dept: 'Department of Robotics',
        },
        {
          name: 'Asif Alamgir',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2020-2021/15.jpg',
          profile_url: 'https://www.facebook.com/asif.alamgir.710',
          post: 'Treasurer',
          dept: null,
        },
      ],
    },
    {
      session: '2019-2020',
      members: [
        {
          name: 'Chowdhury Isfatul Karim',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2019-2020/1.jpg',
          profile_url: 'https://www.facebook.com/isfatul.karim',
          post: 'President',
          dept: 'Department of Programming',
        },
        {
          name: 'Hamidur Rahman Khan',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2019-2020/2.jpg',
          profile_url: 'https://www.facebook.com/hamidur.rk',
          post: 'President',
          dept: 'Department of Robotics',
        },
        {
          name: 'Fahim Murshed',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2019-2020/3.jpg',
          profile_url: 'https://www.facebook.com/rabby.fahimmurshed.3',
          post: 'President',
          dept: 'Department of Administration',
        },
        {
          name: 'Hrithik Deb',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2019-2020/4.jpg',
          profile_url: 'https://www.facebook.com/gs.hrithik',
          post: 'President',
          dept: 'Department of A.W.S',
        },
        {
          name: 'Noor Mohammad Rifat',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2019-2020/5.jpg',
          profile_url: 'https://www.facebook.com/nm.rifat.925',
          post: 'President',
          dept: 'Department of Public Relations',
        },
        {
          name: 'Aritra Arka Sarkar',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2019-2020/6.jpg',
          profile_url: 'https://www.facebook.com/ardour.arcturus',
          post: 'President',
          dept: 'Department of Publications',
        },
        {
          name: 'Nazib Abrar',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2019-2020/7.jpg',
          profile_url: 'https://www.facebook.com/abrar.nirjh0r',
          post: 'Secretary',
          dept: 'Department of Programming',
        },
        {
          name: 'Shihab Sarar Ahmed',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2019-2020/8.jpg',
          profile_url: 'https://www.facebook.com/shihabsarar29',
          post: 'Secretary',
          dept: 'Department of Robotics',
        },
        {
          name: 'Mashfiqun Nabi',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2019-2020/9.jpg',
          profile_url: 'https://www.facebook.com/mashfiqun.nabi',
          post: 'Secretary',
          dept: 'Department of Administration',
        },
        {
          name: 'Hashibul Sharon',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2019-2020/10.jpg',
          profile_url: 'https://www.facebook.com/hashibulsharon',
          post: 'Secretary',
          dept: 'Department of A.W.S',
        },
        {
          name: 'Mostofa Mohiuddin',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2019-2020/11.jpg',
          profile_url: 'https://www.facebook.com/eshan.ahmed.758737',
          post: 'Secretary',
          dept: 'Department of Public Relations',
        },
        {
          name: 'Zuhayer Md. Ajmain Hoque',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2019-2020/12.jpg',
          profile_url: '',
          post: 'Secretary',
          dept: 'Department of Publications',
        },
        {
          name: 'Takbir Hossain Rudro',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2019-2020/13.jpg',
          profile_url: '',
          post: 'Treasurer',
          dept: null,
        },
        {
          name: 'Abir Hasan Rohan',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2019-2020/14.jpg',
          profile_url: 'https://www.facebook.com/ahr627',
          post: 'Executive Member',
          dept: null,
        },
      ],
    },
    {
      session: '2018-2019',
      members: [
        {
          name: 'Intiser Rajoan Parash',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/1.jpg',
          profile_url: 'https://www.facebook.com/intiserx',
          post: 'General Secretary',
          dept: null,
        },
        {
          name: 'Saran Debnath',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/2.jpg',
          profile_url: 'https://www.facebook.com/profile.php?id=100036123218909',
          post: 'Associate General Secratary',
          dept: null,
        },
        {
          name: 'Mir Mashrafi Alam',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/3.jpg',
          profile_url: 'https://www.facebook.com/mashrafi.alam.97',
          post: 'Joint Secretary',
          dept: null,
        },
        {
          name: 'Rahib Elias',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/4.jpg',
          profile_url: 'https://www.facebook.com/rahib.elias',
          post: 'Treasurer',
          dept: null,
        },
        {
          name: 'Naim Rahaman',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/5.jpg',
          profile_url: '',
          post: 'Secretary [Publication]',
          dept: null,
        },
        {
          name: 'Fazle Ruhan',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/6.jpg',
          profile_url: 'https://www.facebook.com/md.ruhan.9237',
          post: 'Secretary [Public Relation]',
          dept: null,
        },
        {
          name: 'Aminul Islam Miraz',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/7.jpg',
          profile_url: 'https://www.facebook.com/aminulislam.miraz.3',
          post: 'Secretary [A.W.S.]',
          dept: null,
        },
        {
          name: 'Al Mubin Nabil',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/8.jpg',
          profile_url: 'https://www.facebook.com/almubin.nabil',
          post: 'Secretary [Robotics]',
          dept: null,
        },
        {
          name: 'Sumit Alam Khan',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/9.jpg',
          profile_url: 'https://www.facebook.com/profile.php?id=100010422460989',
          post: 'Secretary [Programming]',
          dept: null,
        },
        {
          name: 'Hasibul Hasan Ahmed',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/10.jpg',
          profile_url: 'https://www.facebook.com/hasibul.hasan.5283',
          post: 'Associate Secretary [Publication]',
          dept: null,
        },
        {
          name: 'Farhan Rahman Fahim',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/11.jpg',
          profile_url: '',
          post: 'Associate Secretary [Publication]',
          dept: null,
        },
        {
          name: 'Jubaidul Jobaer Rakib',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/12.jpg',
          profile_url: '',
          post: 'Associate Secretary [Public Relation]',
          dept: null,
        },
        {
          name: 'Ahmed Atif Abrar',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/13.jpg',
          profile_url: 'https://www.facebook.com/ahmed.atifabrar',
          post: 'Associate Secretary [Public Relation]',
          dept: null,
        },
        {
          name: 'Sabbir Ahmed Khan',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/14.jpg',
          profile_url: 'https://www.facebook.com/sabbirahmedkhan19',
          post: 'Associate Secretary [A.W.S.]',
          dept: null,
        },
        {
          name: 'Al Imran Sonet',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/15.jpg',
          profile_url: 'https://www.facebook.com/alimran.sonet.79',
          post: 'Associate Secretary [A.W.S.]',
          dept: null,
        },
        {
          name: 'Arban Hossain',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/16.jpg',
          profile_url: 'https://www.facebook.com/liquidicalpants',
          post: 'Associate Secretary [Robotics]',
          dept: null,
        },
        {
          name: 'Shantanu Rahman',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/17.jpg',
          profile_url: 'https://www.facebook.com/shantanu.nerd',
          post: 'Associate Secretary [Programming]',
          dept: null,
        },
        {
          name: 'Fahim Hossain',
          image_url:
            'https://raw.githubusercontent.com/nditc/nditc_mobile_app/main/images/executives/2018-2019/18.jpg',
          profile_url: 'https://www.facebook.com/fahimhossain.sahil',
          post: 'Executive Member',
          dept: null,
        },
      ],
    },
  ],
};
export default db;
