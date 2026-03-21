import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Euro } from "lucide-react";

const ProfitCalculator = () => {
  const [sellingPrice, setSellingPrice] = useState("");
  const [materialCost, setMaterialCost] = useState("");
  const [workHours, setWorkHours] = useState("");
  const [workMinutes, setWorkMinutes] = useState("");
  const [productsPerMonth, setProductsPerMonth] = useState("");
  const [results, setResults] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();

    const price = parseFloat(sellingPrice) || 0;
    const cost = parseFloat(materialCost) || 0;
    const hours = parseFloat(workHours) || 0;
    const minutes = parseFloat(workMinutes) || 0;
    const products = parseInt(productsPerMonth) || 0;

    const profitPerPiece = price - cost;
    const monthlyProfit = profitPerPiece * products;
    const yearlyProfit = monthlyProfit * 12;
    const totalHours = hours + (minutes / 60);
    const monthlyWorkHours = totalHours * products;

    setResults({
      profitPerPiece,
      monthlyProfit,
      yearlyProfit,
      monthlyWorkHours
    });
  };

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 overflow-hidden">
        <form onSubmit={handleCalculate} className="p-6 space-y-6">
          <div>
            <label className="text-sm font-medium text-stone-500 mb-1.5 block uppercase tracking-wider">
              Prezzo di Vendita (€)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              className="input-field w-full"
              placeholder="0.00"
              required
              data-testid="selling-price-input"
            />
          </div>

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
              data-testid="material-cost-profit-input"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-stone-500 mb-1.5 block uppercase tracking-wider">
              Tempo per Prodotto
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
                  data-testid="profit-work-hours-input"
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
                  data-testid="profit-work-minutes-input"
                />
                <p className="text-xs text-stone-400 mt-1">Minuti</p>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-stone-500 mb-1.5 block uppercase tracking-wider">
              Prodotti Venduti al Mese
            </label>
            <input
              type="number"
              min="0"
              value={productsPerMonth}
              onChange={(e) => setProductsPerMonth(e.target.value)}
              className="input-field w-full"
              placeholder="0"
              required
              data-testid="products-per-month-input"
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-full flex items-center justify-center gap-2 text-lg"
            data-testid="calculate-profit-button"
          >
            <TrendingUp size={20} />
            Calcola Guadagno
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
              Analisi Guadagno
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-stone-50 rounded-xl p-4">
                <div className="text-xs text-stone-500 uppercase tracking-wider mb-1">Profitto per Pezzo</div>
                <div className="font-mono text-2xl font-bold text-charcoal flex items-center gap-1" data-testid="result-profit-per-piece">
                  <Euro size={20} />
                  {results.profitPerPiece.toFixed(2)}
                </div>
              </div>

              <div className="bg-sage/10 rounded-xl p-4 border-2 border-sage">
                <div className="text-xs text-sage-dark uppercase tracking-wider mb-1">Guadagno Mensile</div>
                <div className="font-mono text-2xl font-bold text-sage-dark flex items-center gap-1" data-testid="result-monthly-profit">
                  <Euro size={20} />
                  {results.monthlyProfit.toFixed(2)}
                </div>
              </div>

              <div className="bg-gold/20 rounded-xl p-4">
                <div className="text-xs text-stone-700 uppercase tracking-wider mb-1">Guadagno Annuale</div>
                <div className="font-mono text-2xl font-bold text-stone-800 flex items-center gap-1" data-testid="result-yearly-profit">
                  <Euro size={20} />
                  {results.yearlyProfit.toFixed(2)}
                </div>
              </div>

              <div className="bg-clay/30 rounded-xl p-4">
                <div className="text-xs text-stone-600 uppercase tracking-wider mb-1">Ore Lavoro Mensili</div>
                <div className="font-mono text-2xl font-bold text-stone-700" data-testid="result-monthly-work-hours">
                  {results.monthlyWorkHours.toFixed(1)}h
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProfitCalculator;
