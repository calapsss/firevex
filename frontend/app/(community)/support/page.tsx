import Head from 'next/head';

function SupportPage() {
  return (
    <div className="h-screen flex flex-col">
      <Head>
        <title>Support</title>
      </Head>
      <div className="flex-1 overflow-y-auto p-6">
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Support Resources</h2>
          <ul className="flex flex-wrap -mx-4">
            <li className="w-full md:w-1/2 xl:w-1/3 p-4">
              <div className="bg-white shadow-md p-4 rounded">
                <h4 className="text-lg font-bold">FAQs</h4>
                <p className="text-gray-600">Frequently Asked Questions</p>
                <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                  View FAQs
                </button>
              </div>
            </li>
            <li className="w-full md:w-1/2 xl:w-1/3 p-4">
              <div className="bg-white shadow-md p-4 rounded">
                <h4 className="text-lg font-bold">Knowledge Base</h4>
                <p className="text-gray-600">In-depth guides and tutorials</p>
                <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                  View Knowledge Base
                </button>
              </div>
            </li>
            <li className="w-full md:w-1/2 xl:w-1/3 p-4">
              <div className="bg-white shadow-md p-4 rounded">
                <h4 className="text-lg font-bold">Community Forum</h4>
                <p className="text-gray-600">Ask questions and get answers from our community</p>
                <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                  Visit Community Forum
                </button>
              </div>
            </li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
          <div className="bg-white shadow-md p-4 rounded">
            <p className="text-gray-600">Have a question or need help? Contact us:</p>
            <ul>
              <li>
                <a href="mailto:support@example.com" className="text-blue-600 hover:text-blue-800">
                  support@example.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="text-blue-600 hover:text-blue-800">
                  +1234567890
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SupportPage;
