import React from "react";

const ForumPage = () => {
  const forumTopics = [
    {
      id: 1,
      title: "How to Get Started with AI?",
      description: "Discuss the best practices and resources for beginners in AI.",
      posts: 34,
      lastUpdated: "2 hours ago",
    },
    {
      id: 2,
      title: "Top Machine Learning Frameworks",
      description: "Share your thoughts on TensorFlow, PyTorch, and others.",
      posts: 56,
      lastUpdated: "5 hours ago",
    },
    {
      id: 3,
      title: "Ethical Issues in AI",
      description:
        "Discuss the moral challenges in AI development and deployment.",
      posts: 23,
      lastUpdated: "1 day ago",
    },
    {
      id: 4,
      title: "Future of AI in Healthcare",
      description:
        "Explore the impact of AI on medical diagnosis and patient care.",
      posts: 12,
      lastUpdated: "3 days ago",
    },
    {
      id: 5,
      title: "AI and Job Automation",
      description:
        "Will AI replace jobs, or create new opportunities? Share your views.",
      posts: 45,
      lastUpdated: "1 week ago",
    },
    {
      id: 6,
      title: "Best Resources to Learn Deep Learning",
      description: "Curate a list of books, courses, and articles for learning.",
      posts: 78,
      lastUpdated: "2 weeks ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 flex flex-col items-center my-10">
      {/* Header Section */}
      <div className="w-full max-w-7xl bg-white rounded-xl p-8 mb-10">
        <h1 className="text-4xl font-bold text-[#202C45]">Forum</h1>
        <p className="text-lg text-gray-700 mt-3">
          Join discussions, ask questions, and share your knowledge about AI and its applications.
        </p>
      </div>

      {/* Forum Topics */}
      <div className="w-full max-w-7xl space-y-6">
        {forumTopics.map((topic) => (
          <div
            key={topic.id}
            className="shadow-md rounded-lg p-6 hover:shadow-lg delay-75 hover:bg-[#c0ceeb] transition duration-200"
          >
            <h2 className="text-2xl font-semibold text-gray-800">{topic.title}</h2>
            <p className="text-gray-700 mt-2">{topic.description}</p>
            <div className="mt-4 text-sm text-gray-600 flex justify-between items-center">
              <span>{topic.posts} Posts</span>
              <span>Last updated: {topic.lastUpdated}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumPage;
