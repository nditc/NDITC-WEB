const AboutData = {
  events: {
    intra: 15,
    national: 7,
  },
  members: 700,
  alumni: 2700,
  years: Math.floor(
    (new Date().valueOf() - new Date("06-27-2018").valueOf()) /
      (1000 * 3600 * 24 * 365),
  ),
};

export default AboutData;
