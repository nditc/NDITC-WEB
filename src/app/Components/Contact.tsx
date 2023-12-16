'use client';

const Contact = () => {
  return (
    <>
      <div className="mt-36 flex flex-col items-center bg-zinc-200">
        <div className="w-screen flex flex-col gap-10  md:flex-row justify-center md:justify-between">
          <div className="flex-1 md:w-1/2  py-10 bg-zinc-200 ">
            <div
              id="Contact"
              className="flex flex-col mt-7  items-center md:items-start justify-center 2xl:pl-32 container-padding-left"
            >
              <div className="flex flex-col md:flex-row gap-2">
                <h1 className="text-5xl mb-5 text-center md:text-left text-blue-500">
                  GET IN TOUCH
                </h1>
                <h1 className="text-5xl mb-5 text-center md:text-left">WITH US</h1>
              </div>
              <div className="mb-6 w-[96%] max-w-[550px]">
                <label
                  htmlFor="default-input"
                  className="block mb-2 text-lg font-medium text-gray-900"
                >
                  Name
                </label>
                <input
                  placeholder="Your Name"
                  type="text"
                  id="default-input"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-6 py-4"
                />
              </div>
              <div className="mb-6 w-[96%] max-w-[550px]">
                <label
                  htmlFor="default-input"
                  className="block mb-2 text-lg font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  placeholder="Your Email Address"
                  type="text"
                  id="default-input"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-6 py-4"
                />
              </div>
              <div className="mb-6 w-[96%] max-w-[550px]">
                <label
                  htmlFor="default-input"
                  className="block mb-2 text-lg font-medium text-gray-900"
                >
                  Message
                </label>
                <textarea
                  placeholder="Type your query here....."
                  id="large-input"
                  rows={5}
                  className="block resize-none w-full px-6 py-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded text-sm px-5 py-2.5 me-2 mb-2"
              >
                Send my message
              </button>
            </div>
          </div>

          <div className="relative md:w-1/2 flex-1 ">
            <iframe
              width="100%"
              height="600"
              className="h-full min-h-[500px]"
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=notre%20dame%20college+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
