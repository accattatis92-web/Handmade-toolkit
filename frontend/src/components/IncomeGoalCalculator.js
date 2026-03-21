import { useState } from "react";
import { motion } from "framer-motion";
import { Target, Package, Clock } from "lucide-react";

const IncomeGoalCalculator = () => {
  const [monthlyGoal, setMonthlyGoal] = useState("");
  const [profitPerProduct, setProfitPerProduct] = useState("");
  const [workHours, setWorkHours] = useState("");
  const [workMinutes, setWorkMinutes] = useState("");
  const [results, setResults] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();

    const goal = parseFloat(monthlyGoal) || 0;
    const profit = parseFloat(profitPerProduct) || 0;
    const hours = parseFloat(workHours) || 0;
    const minutes = parseFloat(workMinutes) || 0;

    if (profit === 0) {
      alert("Il profitto per prodotto non può essere zero");
      return;
    }

    const productsPerMonth = goal / profit;
    const productsPerWeek = productsPerMonth / 4;
    
    const timePerProduct = hours + (minutes / 60);
    const monthlyWorkHours = timePerProduct * productsPerMonth;
    const weeklyWorkHours = monthlyWorkHours / 4;

    setResults({
      productsPerMonth,
      productsPerWeek,
      monthlyWorkHours,
      weeklyWorkHours
    });
  };

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 overflow-hidden">
        <form onSubmit={handleCalculate} className="p-6 space-y-6">
          <div>
            <label className="text-sm font-medium text-stone-500 mb-1.5 block uppercase tracking-wider">
              Guadagno Mensile Desiderato (€)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={monthlyGoal}
              onChange={(e) => setMonthlyGoal(e.target.value)}
              className="input-field w-full"
              placeholder="300.00"
              required
              data-testid="monthly-goal-input"
            />
            <p className="text-xs text-stone-400 mt-1">
              Quanto vuoi guadagnare al mese?
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-stone-500 mb-1.5 block uppercase tracking-wider">
              Profitto per Prodotto (€)
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={profitPerProduct}
              onChange={(e) => setProfitPerProduct(e.target.value)}
              className="input-field w-full"
              placeholder="8.00"
              required
              data-testid="profit-per-product-input"
            />
            <p className="text-xs text-stone-400 mt-1">
              Quanto guadagni netto per ogni prodotto venduto?
            </p>
          </div>

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
                  data-testid="goal-work-hours-input"
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
                  data-testid="goal-work-minutes-input"
                />
                <p className="text-xs text-stone-400 mt-1">Minuti</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary w-full flex items-center justify-center gap-2 text-lg"
            data-testid="calculate-goal-button"
          >
            <Target size={20} />
            Calcola Obiettivo
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
              Piano per il tuo Obiettivo
            </h2>

            <div className="space-y-4">
              <div className="bg-sage/10 rounded-xl p-5 border-2 border-sage">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="text-sage-dark" size={20} />
                  <div className="text-sm text-sage-dark uppercase tracking-wider font-medium">Prodotti da Vendere al Mese</div>
                </div>
                <div className="font-mono text-3xl font-bold text-sage-dark" data-testid="result-products-per-month">
                  {Math.ceil(results.productsPerMonth)} prodotti
                </div>
              </div>

              <div className="bg-stone-50 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="text-stone-600" size={20} />
                  <div className="text-sm text-stone-600 uppercase tracking-wider font-medium">Prodotti da Vendere a Settimana</div>
                </div>
                <div className="font-mono text-3xl font-bold text-stone-700" data-testid="result-products-per-week">
                  {Math.ceil(results.productsPerWeek)} prodotti
                </div>
              </div>

              <div className="bg-gold/20 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="text-stone-700" size={20} />
                  <div className="text-sm text-stone-700 uppercase tracking-wider font-medium">Ore di Lavoro al Mese</div>
                </div>
                <div className="font-mono text-3xl font-bold text-stone-800" data-testid="result-monthly-work-hours">
                  {results.monthlyWorkHours.toFixed(1)} ore
                </div>
              </div>

              <div className="bg-clay/30 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="text-stone-600" size={20} />
                  <div className="text-sm text-stone-600 uppercase tracking-wider font-medium">Ore di Lavoro a Settimana</div>
                </div>
                <div className="font-mono text-3xl font-bold text-stone-700" data-testid="result-weekly-work-hours">
                  {results.weeklyWorkHours.toFixed(1)} ore
                </div>
                <p className="text-xs text-stone-500 mt-2">Circa {(results.weeklyWorkHours / 8).toFixed(1)} giorni lavorativi a settimana</p>
              </div>
            </div>

            <div className="mt-6 bg-amber-50 border-l-4 border-amber-400 p-4 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>Suggerimento:</strong> Per raggiungere il tuo obiettivo di <span className="font-mono">€{parseFloat(monthlyGoal).toFixed(2)}</span> al mese, 
                devi vendere circa <span className="font-mono font-bold">{Math.ceil(results.productsPerWeek)} prodotti a settimana</span> e 
                dedicare <span className="font-mono font-bold">{results.weeklyWorkHours.toFixed(1)} ore</span> alla produzione.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default IncomeGoalCalculator;
