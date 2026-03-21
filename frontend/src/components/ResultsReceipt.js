import { motion } from "framer-motion";
import { Download, AlertTriangle } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import MarketPriceCheck from "./MarketPriceCheck";

const ResultsReceipt = ({ results, inputData }) => {
  const receiptRef = useRef(null);

  const isUnderpriced = (userPrice) => {
    return userPrice < results.total_cost;
  };

  const handleExportPDF = async () => {
    const element = receiptRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#FDFBF7",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("handmade-price-calculator.pdf");
    } catch (error) {
      console.error("Errore durante l'esportazione PDF:", error);
      alert("Errore durante l'esportazione. Riprova.");
    }
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="mt-8"
    >
      <div ref={receiptRef} className="result-card rounded-2xl">
        <div className="receipt-tear"></div>
        
        <h2 className="font-serif text-2xl text-charcoal mb-4 text-center">
          Risultati del Calcolo
        </h2>

        <div className="space-y-3 mb-6">
          <div className="result-item">
            <span className="text-stone-600">Costo Materiali</span>
            <span className="font-mono text-lg font-semibold" data-testid="result-material-cost">
              €{results.material_cost}
            </span>
          </div>

          <div className="result-item">
            <span className="text-stone-600">Costo Lavoro</span>
            <span className="font-mono text-lg font-semibold" data-testid="result-labor-cost">
              €{results.labor_cost}
            </span>
          </div>

          <div className="result-item">
            <span className="text-stone-600">Spese Extra</span>
            <span className="font-mono text-lg font-semibold">
              €{results.extra_expenses}
            </span>
          </div>

          <div className="result-item">
            <span className="text-stone-600 font-semibold">Costo Totale</span>
            <span className="font-mono text-xl font-bold text-charcoal" data-testid="result-total-cost">
              €{results.total_cost}
            </span>
          </div>
        </div>

        <div className="border-t-2 border-dashed border-sage pt-6 space-y-4">
          <h3 className="font-serif text-xl text-charcoal mb-3">Prezzi Suggeriti</h3>

          <div className="bg-stone-50 rounded-xl p-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium text-stone-700">Prezzo Minimo</div>
                <div className="text-xs text-stone-500">+20% margine</div>
              </div>
              <div className="font-mono text-2xl font-bold text-stone-700" data-testid="result-minimum-price">
                €{results.min_price}
              </div>
            </div>
          </div>

          <div className="bg-sage/10 rounded-xl p-4 border-2 border-sage">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium text-sage-dark">Prezzo Consigliato ⭐</div>
                <div className="text-xs text-stone-600">+50% margine</div>
              </div>
              <div className="font-mono text-2xl font-bold text-sage-dark" data-testid="result-recommended-price">
                €{results.suggested_price}
              </div>
            </div>
          </div>

          <div className="bg-gold/20 rounded-xl p-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium text-stone-700">Prezzo Premium</div>
                <div className="text-xs text-stone-600">+100% margine</div>
              </div>
              <div className="font-mono text-2xl font-bold text-stone-800" data-testid="result-premium-price">
                €{results.premium_price}
              </div>
            </div>
          </div>
        </div>

        <div 
          className="mt-6 bg-amber-50 border-l-4 border-amber-400 p-4 rounded-lg flex items-start gap-3"
          data-testid="pricing-tip"
        >
          <AlertTriangle className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
          <div className="text-sm text-amber-800">
            <strong>Consiglio:</strong> Il prezzo minimo copre solo i costi senza guadagno. 
            Ti consigliamo di usare il prezzo consigliato o premium per valorizzare il tuo lavoro.
          </div>
        </div>

        <MarketPriceCheck suggestedPrice={parseFloat(results.suggested_price)} />
      </div>

      <button
        onClick={handleExportPDF}
        className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
        data-testid="export-pdf-button"
      >
        <Download size={20} />
        Esporta in PDF
      </button>
    </motion.div>
  );
};

export default ResultsReceipt;
