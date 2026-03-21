import { useState } from "react";
import { CheckCircle, AlertTriangle, AlertCircle, Gem } from "lucide-react";

const categories = [
  { value: "decorazione", label: "Decorazione Casa", lowThreshold: 15, midThreshold: 50, premiumThreshold: 100 },
  { value: "accessori", label: "Accessori", lowThreshold: 10, midThreshold: 35, premiumThreshold: 80 },
  { value: "bambini", label: "Prodotti per Bambini", lowThreshold: 12, midThreshold: 40, premiumThreshold: 90 },
  { value: "personalizzati", label: "Articoli Personalizzati", lowThreshold: 20, midThreshold: 60, premiumThreshold: 120 },
  { value: "altro", label: "Altro", lowThreshold: 10, midThreshold: 40, premiumThreshold: 80 }
];

const MarketPriceCheck = ({ suggestedPrice }) => {
  const [selectedCategory, setSelectedCategory] = useState("decorazione");
  const [userPrice, setUserPrice] = useState(suggestedPrice || "");
  const [analysis, setAnalysis] = useState(null);

  const analyzePrice = () => {
    const price = parseFloat(userPrice);
    if (!price || price <= 0) {
      return;
    }

    const category = categories.find(c => c.value === selectedCategory);
    let result = {};

    if (price < category.lowThreshold * 0.7) {
      result = {
        status: "very-low",
        icon: AlertCircle,
        color: "red",
        bgColor: "bg-red-50",
        borderColor: "border-red-400",
        textColor: "text-red-700",
        iconColor: "text-red-500",
        title: "Prezzo Molto Basso",
        message: `Il tuo prezzo di €${price.toFixed(2)} è significativamente sotto la media di mercato per ${category.label}. Potresti sottovalutare il tuo lavoro.`
      };
    } else if (price < category.lowThreshold) {
      result = {
        status: "low",
        icon: AlertTriangle,
        color: "orange",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-400",
        textColor: "text-orange-700",
        iconColor: "text-orange-500",
        title: "Prezzo Basso",
        message: `Il tuo prezzo di €${price.toFixed(2)} è sotto la fascia media di mercato (€${category.lowThreshold}-€${category.midThreshold}). Considera di aumentarlo per valorizzare meglio il tuo prodotto.`
      };
    } else if (price >= category.lowThreshold && price <= category.midThreshold) {
      result = {
        status: "competitive",
        icon: CheckCircle,
        color: "green",
        bgColor: "bg-green-50",
        borderColor: "border-green-400",
        textColor: "text-green-700",
        iconColor: "text-green-500",
        title: "Prezzo Competitivo",
        message: `Ottimo! Il tuo prezzo di €${price.toFixed(2)} è nella fascia competitiva di mercato per ${category.label} (€${category.lowThreshold}-€${category.midThreshold}).`
      };
    } else if (price > category.midThreshold && price <= category.premiumThreshold) {
      result = {
        status: "premium",
        icon: Gem,
        color: "purple",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-400",
        textColor: "text-purple-700",
        iconColor: "text-purple-500",
        title: "Prezzo Premium",
        message: `Il tuo prezzo di €${price.toFixed(2)} è nella fascia premium. Assicurati che la qualità e l'unicità del prodotto giustifichino questo posizionamento.`
      };
    } else {
      result = {
        status: "luxury",
        icon: Gem,
        color: "gold",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-400",
        textColor: "text-amber-800",
        iconColor: "text-amber-600",
        title: "Prezzo Luxury",
        message: `Il tuo prezzo di €${price.toFixed(2)} è nella fascia luxury (oltre €${category.premiumThreshold}). Eccellente se offri prodotti esclusivi e di alta qualità artigianale.`
      };
    }

    setAnalysis(result);
  };

  return (
    <div className="mt-6 pt-6 border-t-2 border-dashed border-stone-200">
      <h3 className="font-serif text-xl text-charcoal mb-4 text-center">
        Confronto con il Mercato
      </h3>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-stone-500 mb-1.5 block uppercase tracking-wider">
            Categoria Prodotto
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-field w-full"
            data-testid="market-category-select"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-stone-500 mb-1.5 block uppercase tracking-wider">
            Prezzo di Vendita Previsto (€)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={userPrice}
            onChange={(e) => setUserPrice(e.target.value)}
            className="input-field w-full"
            placeholder="0.00"
            data-testid="market-price-input"
          />
        </div>

        <button
          onClick={analyzePrice}
          className="btn-secondary w-full"
          data-testid="analyze-market-button"
        >
          Analizza Prezzo
        </button>
      </div>

      {analysis && (
        <div
          className={`mt-6 ${analysis.bgColor} border-l-4 ${analysis.borderColor} p-4 rounded-lg`}
          data-testid="market-analysis-result"
        >
          <div className="flex items-start gap-3">
            <analysis.icon className={`${analysis.iconColor} flex-shrink-0 mt-0.5`} size={24} />
            <div>
              <div className={`font-semibold ${analysis.textColor} mb-1`}>
                {analysis.title}
              </div>
              <p className={`text-sm ${analysis.textColor}`}>
                {analysis.message}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 bg-stone-50 rounded-lg p-3">
        <p className="text-xs text-stone-600">
          <strong>Nota:</strong> I range di prezzo sono indicativi e basati su medie di mercato generale. 
          Considera sempre la qualità dei materiali, il tempo impiegato e l'unicità del tuo prodotto.
        </p>
      </div>
    </div>
  );
};

export default MarketPriceCheck;
