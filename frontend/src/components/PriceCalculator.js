import { useState } from "react";
import CalculatorForm from "./CalculatorForm";
import ResultsReceipt from "./ResultsReceipt";

const PriceCalculator = () => {
  const [results, setResults] = useState(null);
  const [inputData, setInputData] = useState(null);

  return (
    <div>
      <CalculatorForm 
        setResults={setResults} 
        setInputData={setInputData}
      />

      {results && (
        <ResultsReceipt 
          results={results} 
          inputData={inputData}
        />
      )}
    </div>
  );
};

export default PriceCalculator;
