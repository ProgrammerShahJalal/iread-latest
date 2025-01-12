import Image from 'next/image';
import React from 'react';

const AIModelsPage = () => {
  const models = [
    {
      id: 1,
      title: "Language Understanding Model",
      description:
        "A powerful natural language processing model that can understand, generate, and summarize text with high accuracy.",
      image: "https://cdn.pixabay.com/photo/2024/06/16/15/51/ai-generated-8833691_960_720.png",
    },
    {
      id: 2,
      title: "Vision Recognition Model",
      description:
        "A cutting-edge AI model for image recognition and object detection, perfect for computer vision tasks.",
      image: "https://cdn.pixabay.com/photo/2024/01/24/15/10/ai-generated-8529788_960_720.jpg",
    },
    {
      id: 3,
      title: "Recommendation Engine",
      description:
        "A sophisticated model that provides personalized recommendations to improve user engagement and satisfaction.",
      image: "https://cdn.pixabay.com/photo/2024/03/13/19/06/ai-generated-8631634_1280.jpg",
    },
    {
      id: 4,
      title: "Speech Recognition System",
      description:
        "An AI model that converts spoken language into text with exceptional accuracy for transcription and voice commands.",
      image: "https://cdn.pixabay.com/photo/2023/06/13/16/37/ai-generated-8061342_1280.jpg",
    },
    {
      id: 5,
      title: "Autonomous Driving AI",
      description:
        "A specialized model designed for self-driving cars, providing navigation, obstacle detection, and decision-making capabilities.",
      image: "https://cdn.pixabay.com/photo/2023/02/06/21/32/ai-generated-7772790_1280.jpg",
    },
    {
      id: 6,
      title: "AI-Powered Chatbot",
      description:
        "A conversational AI model that provides intelligent responses, customer support, and engaging interactions.",
      image: "https://cdn.pixabay.com/photo/2024/03/15/19/51/ai-generated-8635685_960_720.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 flex flex-col items-center">
      {/* Header Section */}
      <div className="w-full max-w-7xl bg-white rounded-xl p-8 mb-10">
        <h1 className="text-4xl font-bold text-[#202C45]">AI Models</h1>
        <p className="text-lg text-gray-700 mt-3">
          Discover our curated collection of state-of-the-art AI models designed to revolutionize your learning and productivity.
        </p>
      </div>

      {/* AI Models List */}
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {models.map((model) => (
          <div
            key={model.id}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
          >
            <Image
              src={model.image}
              alt={model.title}
              className="w-full h-64 object-cover"
              width={400}
              height={250}
            />
            <div className="p-6 flex-1 flex flex-col">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {model.title}
              </h2>
              <p className="text-gray-700 mb-4">{model.description}</p>
              <button className="mt-auto bg-[#202C45] text-white font-semibold px-4 py-2 rounded-lg hover:bg-black transition duration-200">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIModelsPage;
