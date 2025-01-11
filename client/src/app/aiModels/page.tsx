import React from 'react';

const AIModelsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Header Section */}
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-4xl font-bold text-blue-600">AI Models</h1>
        <p className="text-lg text-gray-700 mt-2">
          Explore our curated collection of state-of-the-art AI models designed to enhance your learning and productivity.
        </p>
      </div>

      {/* AI Models List */}
      <div className="w-full max-w-5xl space-y-6">
        {/* Model 1 */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center md:items-start">
          <img
            src="https://via.placeholder.com/150"
            alt="Model 1"
            className="w-36 h-36 rounded-lg object-cover mr-6"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Language Understanding Model</h2>
            <p className="text-gray-700 mt-2">
              A powerful natural language processing model that can understand, generate, and summarize text with high accuracy.
            </p>
            <button className="mt-4 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
              Learn More
            </button>
          </div>
        </div>

        {/* Model 2 */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center md:items-start">
          <img
            src="https://via.placeholder.com/150"
            alt="Model 2"
            className="w-36 h-36 rounded-lg object-cover mr-6"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Vision Recognition Model</h2>
            <p className="text-gray-700 mt-2">
              A cutting-edge AI model for image recognition and object detection, perfect for computer vision tasks.
            </p>
            <button className="mt-4 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
              Learn More
            </button>
          </div>
        </div>

        {/* Model 3 */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center md:items-start">
          <img
            src="https://via.placeholder.com/150"
            alt="Model 3"
            className="w-36 h-36 rounded-lg object-cover mr-6"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Recommendation Engine</h2>
            <p className="text-gray-700 mt-2">
              A sophisticated model that provides personalized recommendations to improve user engagement and satisfaction.
            </p>
            <button className="mt-4 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIModelsPage;
