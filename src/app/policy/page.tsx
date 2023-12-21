import CommonPage from "../Components/CommonPage/CommonPage";
import { MdOutlinePrivacyTip } from "react-icons/md";

const Sections = [
  {
    heading: "General Information",
    content: (
      <p>
        General Information At NDITC (Notre Dame Information Technology Club),
        we value your privacy and are committed to safeguarding your personal
        information. This Privacy Policy outlines how we collect, use, disclose,
        and manage your information when you engage with our club, participate
        in our events, workshops, projects, or publications, or interact with
        our website or mobile app.
      </p>
    ),
  },
  {
    heading: "Information Collection",
    content: (
      <p>
        We may gather information for our site to enhance performance and to
        make sure to show content according to your preferences. This section
        outlines what type of information we may gather if required.
      </p>
    ),
    subSections: [
      {
        heading: "Usage Information",
        content: (
          <p>
            We may automatically gather certain information about your
            interaction with our website or mobile app, including your IP
            address, device information, browser type, pages visited, and
            duration of visit. This data helps us improve our services and user
            experience.
          </p>
        ),
      },
    ],
  },
  {
    heading: "Use of Information",
    content: (
      <p>
        This section displays what we may do with collected data, gathered from
        users. This will only be used in certain use cases to ensure the
        perfection of our events.
      </p>
    ),
    subSections: [
      {
        heading: "Event Participation",
        content: (
          <p>
            Your personal information is used to facilitate your participation
            in our events, workshops, and projects. This may include
            communication regarding event details, updates, and relevant
            information.
          </p>
        ),
      },
      {
        heading: "Communication",
        content: (
          <p>
            Your personal information is used to facilitate your participation
            in our events, workshops, and projects. This may include
            communication regarding event details, updates, and relevant
            information.We may use your contact information to send newsletters,
            updates about our club activities, upcoming events, or important
            announcements related to NDITC.
          </p>
        ),
      },
      {
        heading: "Improving Services",
        content: (
          <p>
            Collected data helps us analyze trends, enhance our website or app
            functionality, and tailor our content to better meet the needs of
            our users.
          </p>
        ),
      },
    ],
  },
  {
    heading: "Information Sharing",
    content: (
      <p>
        We may share some information about you to make sure that the contents
        are always best suited for you.
      </p>
    ),
    subSections: [
      {
        heading: "Third-Party Services",
        content: (
          <p>
            We may engage third-party service providers to assist us in
            organizing events, managing data, or delivering our newsletters.
            These providers are obligated to maintain the confidentiality and
            security of your information.
          </p>
        ),
      },
      {
        heading: "Legal Complianc",
        content: (
          <p>
            We may disclose your information if required to comply with legal
            obligations, enforce our policies, or protect the rights, property,
            or safety of NDITC or others.
          </p>
        ),
      },
    ],
  },
  {
    heading: "Data Security",
    content: (
      <p>
        We employ industry-standard security measures to protect your
        information from unauthorized access, misuse, alteration, or loss.
        However, no method of transmission over the internet or electronic
        storage is being used.
      </p>
    ),
  },
  {
    heading: "Changes to this Privacy Policy",
    content: (
      <p>
        NDITC reserves the right to modify or update this Privacy Policy at any
        time. We encourage you to review this page periodically for any changes.
        Your continued use of our services after modifications constitutes
        acceptance of the updated Privacy Policy.
      </p>
    ),
  },
  {
    heading: "Contact Us",
    content: (
      <p>
        If you have any questions, concerns, or requests regarding this Privacy
        Policy or the handling of your information, please contact us at our
        office or Contact Page of the Website.
      </p>
    ),
  },
  {
    heading: "Last Updated: [12/21/2023]",
    content: (
      <p>Thank you for being part of NDITC. Your privacy matters to us!</p>
    ),
  },
];

const Policy = () => {
  return (
    <div>
      <CommonPage
        heading="Privacy Policy"
        icon={<MdOutlinePrivacyTip className={"w-16 h-16"} />}
        sections={Sections}
        hasTableOfContent
      />
    </div>
  );
};

export default Policy;
