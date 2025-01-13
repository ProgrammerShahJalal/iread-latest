import Image from 'next/image';
import React from 'react';

const TrainersPage = () => {
  const trainers = [
    {
      id: 1,
      name: "John Doe",
      role: "AI Specialist",
      image: "/frontend/images/team/sm-1.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Machine Learning Expert",
      image: "/frontend/images/team/sm-2.jpg",
    },
    {
      id: 3,
      name: "Emily Johnson",
      role: "Data Scientist",
      image: "/frontend/images/team/sm-3.jpg",
    },
    {
      id: 4,
      name: "Michael Brown",
      role: "Deep Learning Engineer",
      image: "/frontend/images/team/sm-4.jpg",
    },
    {
      id: 5,
      name: "Sophia Williams",
      role: "AI Researcher",
      image: "/frontend/images/team/sm-5.jpg",
    },
    {
      id: 6,
      name: "James Taylor",
      role: "Computer Vision Expert",
      image: "/frontend/images/team/team8.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 flex flex-col items-center">
      {/* Header Section */}
      <div className="w-full max-w-7xl bg-white rounded-xl p-8 mb-10">
        <h1 className="text-4xl font-bold text-[#202C45]">Meet Our Trainers</h1>
        <p className="text-lg text-gray-700 mt-3">
          Learn from industry-leading trainers who specialize in AI, machine learning, and data science.
        </p>
      </div>

      {/* Trainers List */}
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {trainers.map((trainer) => (
          <div
            key={trainer.id}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col items-center text-center"
          >
            <Image
              src={trainer.image}
              alt={trainer.name}
              className="w-full h-64 object-cover"
              width={400}
              height={250}
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800">{trainer.name}</h2>
              <p className="text-gray-700 mt-2">{trainer.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainersPage;
