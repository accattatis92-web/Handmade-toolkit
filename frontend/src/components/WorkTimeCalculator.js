import { useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const WorkTimeCalculator = () => {
  const [workHours, setWorkHours] = useState("");
  const [workMinutes, setWorkMinutes] = useState("");
  const [productsPerMonth, setProductsPerMonth] = useState("");
  const [results, setResults] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();

    const hours = parseFloat(workHours) || 0;
    const minutes = parseFloat(workMinutes) || 0;
    const products = parseInt(productsPerMonth) || 0;

    const totalHours = hours + (minutes / 60);
    const monthlyHours = totalHours * products;
    const yearlyHours = monthlyHours * 12;
    const workDays = monthlyHours / 8;

    setResults({
      monthlyHours,
      yearlyHours,
      workDays
    });
  };

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 overflow-hidden">
        <form onSubmit={handleCalculate} className="p-6 space-y-6">
          <div>
            <label className="text-sm font-medium text-stone-500 mb-1.5 block uppercase tracking-wider">
              Tempo per Creare un Prodotto
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
                  data-testid="worktime-hours-input"
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
                  data-testid="worktime-minutes-input"
                />
                <p className="text-xs text-stone-400 mt-1">Minuti</p>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-stone-500 mb-1.5 block uppercase tracking-wider">
              Prodotti Realizzati al Mese
            </label>
            <input
              type="number"
              min="0"
              value={productsPerMonth}
              onChange={(e) => setProductsPerMonth(e.target.value)}
              className="input-field w-full"
              placeholder="0"
              required
              data-testid="worktime-products-per-month-input"
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-full flex items-center justify-center gap-2 text-lg"
            data-testid="calculate-worktime-button"
          >
            <Clock size={20} />
            Calcola Tempo di Lavoro
          </button>
        </form>
      </div>

      {results && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="mt-8"
        >
          <div className="result-card rounded-2xl">
            <div className="receipt-tear"></div>
            
            <h2 className="font-serif text-2xl text-charcoal mb-4 text-center">
              Analisi Tempo di Lavoro
            </h2>

            <div className="space-y-4">
              <div className="bg-sage/10 rounded-xl p-5 border-2 border-sage">
                <div className="text-sm text-sage-dark uppercase tracking-wider mb-2 font-medium">Ore Totali al Mese</div>
                <div className="font-mono text-3xl font-bold text-sage-dark" data-testid="result-monthly-hours">
                  {results.monthlyHours.toFixed(1)} ore
                </div>
              </div>

              <div className="bg-gold/20 rounded-xl p-5">
                <div className="text-sm text-stone-700 uppercase tracking-wider mb-2 font-medium">Ore Totali all'Anno</div>
                <div className="font-mono text-3xl font-bold text-stone-800" data-testid="result-yearly-hours">
                  {results.yearlyHours.toFixed(1)} ore
                </div>
              </div>

              <div className="bg-clay/30 rounded-xl p-5">
                <div className="text-sm text-stone-600 uppercase tracking-wider mb-2 font-medium">Giorni di Lavoro al Mese</div>
                <div className="font-mono text-3xl font-bold text-stone-700" data-testid="result-work-days">
                  {results.workDays.toFixed(1)} giorni
                </div>
                <p className="text-xs text-stone-500 mt-2">(Basato su giornate da 8 ore)</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default WorkTimeCalculator;
