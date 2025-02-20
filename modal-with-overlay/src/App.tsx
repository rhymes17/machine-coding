import { useState } from "react";
import "./App.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"
  };

  return (
    <div className="bg-blue-950 h-[100vh] flex justify-center items-center relative">
      <WhiteCard>
        <Button title="Open Modal" onClick={openModal} />
      </WhiteCard>

      {/* Modal */}
      {isModalOpen && (
        <div
          onClick={closeModal}
          className="bg-black/50 backdrop-blur-lg fixed inset-0 h-[100vh] w-[100vw] flex justify-center items-center transition-opacity duration-300 ease-in-out opacity-100"
        >
          <WhiteCard onClick={(e) => e.stopPropagation()}>
            <>
              {/* Close button */}
              <div
                onClick={closeModal}
                className="absolute top-5 left-5 text-xl border-2 border-black px-3 py-1 rounded-md hover:text-white hover:bg-blue-950 cursor-pointer active:scale-110 transition-all duration-300 ease-in-out"
              >
                X
              </div>

              <div className="flex flex-col gap-5">
                <h1 className="text-2xl">Mussssstaaaaarrrddddd.........</h1>
                <Button title="Close Modal" onClick={closeModal} />
              </div>
            </>
          </WhiteCard>
        </div>
      )}
    </div>
  );
}

export default App;

const Button = ({ title, onClick }: { title: string; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="w-[50%] mx-auto border-2 border-black px-3 py-3 rounded-md text-white bg-blue-950 cursor-pointer active:scale-110 transition-all duration-200 ease-in-out"
    >
      {title}
    </button>
  );
};

const WhiteCard = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: (e: any) => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="h-[40vh] w-[30vw] bg-white rounded-xl flex justify-center items-center relative"
    >
      {children}
    </div>
  );
};
