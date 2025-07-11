import { Dispatch, SetStateAction } from "react";

interface SuggestionCardProps {
  text: string;
  onClick?: () => void;
}

interface PromptSuggestion {
  setPrompt : Dispatch<SetStateAction<string>>
}

const SuggestionCard = ({ text, onClick }: SuggestionCardProps) => {
  return (
    <div 
      className="p-6 w-full border border-neutral-600 border-r-4 border-b-4 hover:scale-101 transition-all hover:duration-200 cursor-pointer rounded-lg flex justify-center items-center"
      onClick={onClick}
    >
      <h1>{text}</h1>
    </div>
  );
};

const PromptSuggestion = ({setPrompt} : PromptSuggestion ) => {
  const suggestions = [
    "Give me full financial analysis of Reliance stock",
    "What is the latest news and concall transcript of Adani green",
    "Give me transcript analysis of PFC",
    "Give me full analysis of HDFC Bank"
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion)
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-lg sm:text-3xl my-6">Hey, How are you?</h1>
      <div className="flex flex-col justify-center items-center gap-2 w-full mb-8">
        <div className="flex flex-row gap-2 w-full max-w-2xl">
          <SuggestionCard 
            text={suggestions[0]} 
            onClick={() => handleSuggestionClick(suggestions[0])} 
          />
          <SuggestionCard 
            text={suggestions[1]} 
            onClick={() => handleSuggestionClick(suggestions[1])} 
          />
        </div>
        <div className="flex flex-row gap-2 w-full max-w-2xl">
          <SuggestionCard 
            text={suggestions[2]} 
            onClick={() => handleSuggestionClick(suggestions[2])} 
          />
          <SuggestionCard 
            text={suggestions[3]} 
            onClick={() => handleSuggestionClick(suggestions[3])} 
          />
        </div>
      </div>
    </div>
  );
};

export default PromptSuggestion;