import { FaC, FaPython } from 'react-icons/fa6';
import { SiC, SiCplusplus, SiPython } from 'react-icons/si';

const Rules = () => {
  return (
    <section id="rules" className="w-screen h-fit pt-16 pb-16 object-cover  text-center md:text-lg">
      <div className="container leading-7">
        <h1 className="mx-auto mb-5 md:mb-8 ">
          <span className="text-4xl md:text-5xl text-center">RULES & </span>{' '}
          <br className="inline md:hidden" />
          <span className="text-primary text-4xl md:text-5xl text-center">ELEGIBILITY </span>{' '}
        </h1>
        <ul className="text-left flex flex-col gap-3 list-[circle]  marker:text-2xl pl-8 marker:text-primary">
          <li>
            {' '}
            All students from schools and colleges (including HSC batch-2023) and corresponding
            institutions such as polytechnic institutes (4th year and below) are eligible to
            participate. Participants have to participate individually.{' '}
          </li>
          <li> The contest will follow the IOI format. </li>
          <li>
            {' '}
            Participants can use{' '}
            <span className="text-secondary font-bold inline-flex items-center ml-2 leading-none align-middle ">
              <SiPython className="inline mr-2 m-0 text-primary" />
              Python
            </span>
            ,{' '}
            <span className="text-secondary font-bold inline-flex items-center leading-none align-middle">
              <SiC className="inline mr-2 m-0 text-primary" />C
            </span>{' '}
            or{' '}
            <span className="text-secondary font-bold inline-flex items-center leading-none align-middle">
              <SiCplusplus className="inline mr-2 m-0 text-primary" />
              C++
            </span>{' '}
            programming language.{' '}
          </li>
          <li> The preliminary contest will last for 3 hours. </li>
          <li>
            {' '}
            Participants selected for the Offline Contest must bring their laptops with them.{' '}
          </li>
          <li> Participants have to participate in the contest using the custom handle. </li>
          <li> Custom handles will be given to participants via email. </li>
          <li>
            Contest will be hosted on{' '}
            <a className="text-primary " href="https://toph.co/">
              https://toph.co/
            </a>{' '}
          </li>
          <li>
            {' '}
            Before one day of the Preliminary contest, Toph.co login credentials will be sent to
            registered participants.
          </li>
        </ul>
        <p className="mt-8 text-left bg-green-50 rounded-xl p-6">
          <strong className="text-primary">⚠️ Plagiarism Issues:</strong> Since Preliminary will be
          an online contest, third-party codes that were written or available online before the
          start of the contest can be used, but it may lead to confusion if more than one
          participant uses the same template. In that case, the decision of the judges will be
          considered. Apart from that, if a person is caught cheating by providing/taking code from
          others, then they will be DISQUALIFIED from the contest immediately.
        </p>
      </div>
    </section>
  );
};

export default Rules;
