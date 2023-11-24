'use client';

const Contact = () => {
  return (
    <div className="mt-36 flex flex-col items-center">
      <h1 className="text-3xl font-ShareTechTown font-semibold mb-5 text-center md:text-left">
        GET IN TOUCH WITH US
      </h1>
      <div className="w-screen flex flex-col mt-7 md:flex-row justify-center md:justify-between">
        <div className="flex-1 flex flex-col items-center justify-center py-10  bg-zinc-200">
          <div className="mb-6 w-[96%] md:w-[70%]">
            <label htmlFor="default-input" className="block mb-2 text-lg font-medium text-gray-900">
              Name
            </label>

            <input
              placeholder=""
              type="text"
              id="default-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-6 py-4"
            />
          </div>

          <div className="mb-6 w-[96%] md:w-[70%]">
            <label htmlFor="default-input" className="block mb-2 text-lg font-medium text-gray-900">
              Email
            </label>

            <input
              placeholder=""
              type="text"
              id="default-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-6 py-4"
            />
          </div>
          <div className="mb-6 w-[96%] md:w-[70%]">
            <label htmlFor="default-input" className="block mb-2 text-lg font-medium text-gray-900">
              Message
            </label>

            <textarea
              id="large-input"
              rows={5}
              className="block resize-none w-full px-6 py-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            Send my message
          </button>
        </div>

        <div className="md:w-[40%] md:mr-5 relative flex-1">
          <iframe
            width="100%"
            height="600"
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=notre%20dame%20college+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
