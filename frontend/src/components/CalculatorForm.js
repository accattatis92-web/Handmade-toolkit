import { useState } from "react";
import { Calculator } from "lucide-react";
import ExperienceSelector from "./ExperienceSelector";

const CalculatorForm = ({ setResults, setInputData }) => {
  const [materialCost, setMaterialCost] = useState("");
  const [workHours, setWorkHours] = useState("");
  const [workMinutes, setWorkMinutes] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("intermedio");
  const [hourlyRate, setHourlyRate] = useState(15);
  const [extraExpenses, setExtraExpenses] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCalculate = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate a brief calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    const hours = parseFloat(workHours) || 0;
    const minutes = parseFloat(workMinutes) || 0;
    const totalHours = hours + (minutes / 60);

    // Calculate directly in the frontend (no backend needed)
    const material = parseFloat(materialCost) || 0;
    const labor = totalHours * (parseFloat(hourlyRate) || 0);
    const extra = parseFloat(extraExpenses) || 0;
    const totalCost = material + labor + extra;

    // Calculate suggested prices with different margins
    const minPrice = totalCost * 1.2;      // 20% margin
    const suggestedPrice = totalCost * 1.5; // 50% margin
    const premiumPrice = totalCost * 2;     // 100% margin

    const results = {
      material_cost: material.toFixed(2),
      labor_cost: labor.toFixed(2),
      extra_expenses: extra.toFixed(2),
      total_cost: totalCost.toFixed(2),
      min_price: minPrice.toFixed(2),
      suggested_price: suggestedPrice.toFixed(2),
      premium_price: premiumPrice.toFixed(2),
      hourly_rate: (parseFloat(hourlyRate) || 0).toFixed(2),
      work_hours: totalHours.toFixed(2)
    };

    setResults(results);
    setInputData({
      materialCost,
      workHours: `${workHours || 0}h ${workMinutes || 0}min`,
      experienceLevel,
      hourlyRate,
      extraExpenses
    });

    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 overflow-hidden">
      <form onSubmit={handleCalculate} className="p-6 space-y-6">
        <div>
          <label className="text-sm font-medium text-stone-500 mb-1.5 block uppercase tracking-wider">
            Costo Materiali (€)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={materialCost}
            onChange={(e) => setMaterialCost(e.target.value)}
            className="input-field w-full"
            placeholder="0.00"
            required
            data-testid="material-cost-input"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-stone-500 mb-1.5 block uppercase tracking-wider">
            Tempo di Lavoro
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="number"
                min="0"
                value={workHours}
                onChange={(e) => setWorkHours(e.target.value)}
                className="input-field w-full"
                placeholder="0"
                data-testid="work-hours-input"
              />
              <p className="text-xs text-stone-400 mt-1">Ore</p>
            </div>
            <div>
              <input
                type="number"
                min="0"
                max="59"
                value={workMinutes}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (val >= 0 && val <= 59) {
                    setWorkMinutes(e.target.value);
                  } else if (e.target.value === "") {
                    setWorkMinutes("");
                  }
                }}
                className="input-field w-full"
                placeholder="0"
                data-testid="work-minutes-input"
              />
              <p className="text-xs text-stone-400 mt-1">Minuti</p>
            </div>
          </div>
        </div>

        <ExperienceSelector
          experienceLevel={experienceLevel}
          setExperienceLevel={setExperienceLevel}
          hourlyRate={hourlyRate}
          setHourlyRate={setHourlyRate}
        />

        <div>
          <label className="text-sm font-medium text-stone-500 mb-1.5 block uppercase tracking-wider">
            Spese Extra (€)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={extraExpenses}
            onChange={(e) => setExtraExpenses(e.target.value)}
            className="input-field w-full"
            placeholder="0.00"
            data-testid="extra-expenses-input"
          />
          <p className="text-xs text-stone-400 mt-1">
            Imballaggio, spedizione, commissioni marketplace
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full flex items-center justify-center gap-2 text-lg disabled:opacity-50 relative"
          data-testid="calculate-button"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Calcolo in corso...</span>
            </>
          ) : (
            <>
              <Calculator size={20} />
              Calcola Prezzi
            </>
          )}
        </button>
        
        {loading && (
          <p className="text-xs text-center text-stone-500 mt-2 animate-pulse">
            ⏳ Calcolo in corso...
          </p>
        )}
      </form>
    </div>
  );
};

export default CalculatorForm;
