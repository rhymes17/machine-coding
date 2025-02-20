import { useState } from "react";
import "./App.css";

type FaqType = {
  id: number,
  question: string;
  answer: string;
};

const faqData: FaqType[] = [
  {
    id: 1,
    question: "What is this application about?",
    answer:
      "This is a non-custodial, multi-currency wallet for storing, transacting, and swapping assets.",
  },
  {
    id: 2,
    question: "How do I perform a swap?",
    answer:
      "Go to the Swap tab, select your assets, enter the amount, and confirm the transaction.",
  },
  {
    id: 3,
    question: "Is my private key safe?",
    answer:
      "Yes, your private key is stored securely on your device and never shared.",
  },
  {
    id: 4,
    question: "What blockchains are supported?",
    answer: "Currently, we support Bitcoin, Ethereum, and PortalChain.",
  },
  {
    id: 5,
    question: "How do I contact support?",
    answer:
      "You can report issues via the 'Report a Bug' button or contact us through our support page.",
  },
];

function App() {
  return (
    <div className="bg-blue-950 h-[100vh] py-5 px-5">
      <div className="border-2 border-white rounded-xl px-2 flex flex-col">
        {faqData.map((faq) => (
          <Faq key={faq.id} faq={faq} />
        ))}
      </div>
    </div>
  );
}

export default App;

const Faq = ({ faq }: { faq: FaqType }) => {
  const { question, answer } = faq;

  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  return (
    <div
      className="flex flex-col py-5 transition-all duration-700 ease-in-out cursor-pointer select-none"
      onClick={() => {
        setIsAnswerVisible((prev) => !prev);
      }}
    >
      <div className="bg-white px-5 py-5 rounded-2xl flex flex-col gap-5 transition-all duration-700 ease-in-out">
        <h1 className="text-2xl">{question}</h1>

        <div
          className={`transition-all duration-700 ease-in-out overflow-hidden ${
            isAnswerVisible ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <h3 className="text-xl">{answer}</h3>
        </div>
      </div>
    </div>
  );
};
