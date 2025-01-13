import FaqCard from "./FaqCard";



const faqs = [
  {
    question:
      "How do I contact support?",
    answer:
      "You can contact our support team through the Contact Us page for any assistance or queries.",
    url: "",
  },
  {
    question:
      "What payment methods are accepted?",
    answer:
      "We currently accept mobile banking payments through Stripe. You can select your preferred method during the checkout process.",
    url: "",
  },
  {
    question:
      "What is the purpose of this website?",
    answer: 'This platform is dedicated to providing enthusiasts and professionals with reliable tips and advice about gardening.',
    url: "",
  },

  {
    question: 'How can I access premium content?',
    answer: 'You can access premium content by subscribing through our payment options, which include Aamarpay or Stripe.',
    url: "",
  },




];

const FaqPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 my-10">
      <h1 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h1>

      <div className="grid grid-cols-1 gap-y-5">
        {faqs.map((faq) => (
          <FaqCard key={faq?.question} faq={faq} />
        ))}
      </div>
    </div>

  );
};

export default FaqPage;