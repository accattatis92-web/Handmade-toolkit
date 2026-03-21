import { useState } from "react";
import "@/App.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogAction } from "@/components/ui/alert-dialog";

function App() {
  // Form states
  const [materialCost, setMaterialCost] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("intermedio");
  const [customRate, setCustomRate] = useState("");
  const [extraExpenses, setExtraExpenses] = useState("");
  
  // Result states
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Experience level rates
  const rates = {
    principiante: 8,
    intermedio: 15,
    esperto: 25
  };

  const calculatePrice = () => {
    // Validate inputs
    const material = parseFloat(materialCost) || 0;
    const hrs = parseInt(hours) || 0;
    const mins = parseInt(minutes) || 0;
    const extra = parseFloat(extraExpenses) || 0;
    
    // Get hourly rate (custom or based on experience level)
    const hourlyRate = customRate ? parseFloat(customRate) : rates[experienceLevel];
    
    // Calculate total hours
    const totalHours = hrs + (mins / 60);
    
    // Calculate labor cost
    const laborCost = totalHours * hourlyRate;
    
    // Calculate base cost (materials + labor + extras)
    const baseCost = material + laborCost + extra;
    
    // Calculate different price points with margins
    const minPrice = baseCost * 1.2; // 20% margin
    const suggestedPrice = baseCost * 1.5; // 50% margin
    const premiumPrice = baseCost * 2; // 100% margin
    
    setResults({
      materialCost: material.toFixed(2),
      laborCost: laborCost.toFixed(2),
      extraExpenses: extra.toFixed(2),
      baseCost: baseCost.toFixed(2),
      minPrice: minPrice.toFixed(2),
      suggestedPrice: suggestedPrice.toFixed(2),
      premiumPrice: premiumPrice.toFixed(2),
      totalHours: totalHours.toFixed(2),
      hourlyRate: hourlyRate.toFixed(2)
    });
    
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setShowResults(true);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-amber-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-amber-900 text-center">
            Business Toolkit
          </h1>
          <p className="text-center text-amber-700 mt-2">
            Strumenti essenziali per artigiani e creativi
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="shadow-lg border-amber-200">
          <CardHeader className="bg-gradient-to-r from-amber-100 to-orange-100">
            <CardTitle className="text-2xl text-amber-900 flex items-center gap-2">
              💰 Calcolatore Prezzi
            </CardTitle>
            <CardDescription className="text-amber-700">
              Calcola il prezzo giusto per i tuoi prodotti artigianali
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Material Cost */}
            <div className="space-y-2">
              <Label htmlFor="material-cost" className="text-base font-semibold text-gray-700">
                Costo Materiali (€)
              </Label>
              <Input
                id="material-cost"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={materialCost}
                onChange={(e) => setMaterialCost(e.target.value)}
                className="text-lg"
              />
            </div>

            {/* Work Time */}
            <div className="space-y-2">
              <Label className="text-base font-semibold text-gray-700">
                Tempo di Lavoro
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hours" className="text-sm text-gray-600">
                    Ore
                  </Label>
                  <Input
                    id="hours"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="text-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="minutes" className="text-sm text-gray-600">
                    Minuti
                  </Label>
                  <Input
                    id="minutes"
                    type="number"
                    min="0"
                    max="59"
                    placeholder="0"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    className="text-lg"
                  />
                </div>
              </div>
            </div>

            {/* Experience Level */}
            <div className="space-y-3">
              <Label className="text-base font-semibold text-gray-700">
                Livello Esperienza
              </Label>
              <div className="grid grid-cols-3 gap-3">
                <Button
                  type="button"
                  variant={experienceLevel === "principiante" ? "default" : "outline"}
                  onClick={() => {
                    setExperienceLevel("principiante");
                    setCustomRate("");
                  }}
                  className={`h-auto py-4 flex flex-col ${
                    experienceLevel === "principiante"
                      ? "bg-amber-600 hover:bg-amber-700"
                      : "hover:bg-amber-50"
                  }`}
                >
                  <span className="text-sm font-medium">Principiante</span>
                  <span className="text-xs mt-1">€8/h</span>
                </Button>
                <Button
                  type="button"
                  variant={experienceLevel === "intermedio" ? "default" : "outline"}
                  onClick={() => {
                    setExperienceLevel("intermedio");
                    setCustomRate("");
                  }}
                  className={`h-auto py-4 flex flex-col ${
                    experienceLevel === "intermedio"
                      ? "bg-amber-600 hover:bg-amber-700"
                      : "hover:bg-amber-50"
                  }`}
                >
                  <span className="text-sm font-medium">Intermedio</span>
                  <span className="text-xs mt-1">€15/h</span>
                </Button>
                <Button
                  type="button"
                  variant={experienceLevel === "esperto" ? "default" : "outline"}
                  onClick={() => {
                    setExperienceLevel("esperto");
                    setCustomRate("");
                  }}
                  className={`h-auto py-4 flex flex-col ${
                    experienceLevel === "esperto"
                      ? "bg-amber-600 hover:bg-amber-700"
                      : "hover:bg-amber-50"
                  }`}
                >
                  <span className="text-sm font-medium">Esperto</span>
                  <span className="text-xs mt-1">€25/h</span>
                </Button>
              </div>
            </div>

            {/* Custom Rate */}
            <div className="space-y-2">
              <Label htmlFor="custom-rate" className="text-base font-semibold text-gray-700">
                Tariffa Oraria Personalizzata (€)
              </Label>
              <p className="text-sm text-gray-500">
                Modifica la tariffa se necessario
              </p>
              <Input
                id="custom-rate"
                type="number"
                min="0"
                step="0.01"
                placeholder="Opzionale"
                value={customRate}
                onChange={(e) => setCustomRate(e.target.value)}
                className="text-lg"
              />
            </div>

            {/* Extra Expenses */}
            <div className="space-y-2">
              <Label htmlFor="extra-expenses" className="text-base font-semibold text-gray-700">
                Spese Extra (€)
              </Label>
              <p className="text-sm text-gray-500">
                Imballaggio, spedizione, commissioni marketplace
              </p>
              <Input
                id="extra-expenses"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={extraExpenses}
                onChange={(e) => setExtraExpenses(e.target.value)}
                className="text-lg"
              />
            </div>

            {/* Calculate Button */}
            <Button
              onClick={calculatePrice}
              disabled={isCalculating}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
            >
              {isCalculating ? "Calcolo in corso..." : "Calcola Prezzi"}
            </Button>

            {/* Info Message */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-800 text-center">
                ⏱️ Prima apertura può richiedere fino a 1 minuto. Le prossime saranno veloci!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Dialog */}
      <AlertDialog open={showResults} onOpenChange={setShowResults}>
        <AlertDialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <AlertDialogTitle className="text-2xl font-bold text-amber-900">
            💰 Risultati del Calcolo
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-6">
              {/* Cost Breakdown */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-900">Dettaglio Costi</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Materiali:</span>
                    <span className="font-medium">€{results?.materialCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Manodopera ({results?.totalHours}h × €{results?.hourlyRate}/h):
                    </span>
                    <span className="font-medium">€{results?.laborCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Spese Extra:</span>
                    <span className="font-medium">€{results?.extraExpenses}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-300">
                    <span className="font-semibold text-gray-900">Costo Totale:</span>
                    <span className="font-bold text-lg">€{results?.baseCost}</span>
                  </div>
                </div>
              </div>

              {/* Price Suggestions */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Prezzi Consigliati</h3>
                
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-green-900">Prezzo Minimo</p>
                        <p className="text-sm text-green-700">+20% margine</p>
                      </div>
                      <p className="text-2xl font-bold text-green-900">€{results?.minPrice}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-200 bg-amber-50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-amber-900">Prezzo Consigliato ⭐</p>
                        <p className="text-sm text-amber-700">+50% margine</p>
                      </div>
                      <p className="text-2xl font-bold text-amber-900">€{results?.suggestedPrice}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 bg-purple-50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-purple-900">Prezzo Premium</p>
                        <p className="text-sm text-purple-700">+100% margine</p>
                      </div>
                      <p className="text-2xl font-bold text-purple-900">€{results?.premiumPrice}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>💡 Suggerimento:</strong> Il prezzo consigliato tiene conto del valore artigianale e della qualità del tuo lavoro. Non aver paura di valorizzare le tue creazioni!
                </p>
              </div>
            </div>
          </AlertDialogDescription>
          <AlertDialogAction
            onClick={() => setShowResults(false)}
            className="bg-amber-600 hover:bg-amber-700"
          >
            Chiudi
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>

      {/* Footer */}
      <footer className="mt-12 pb-8 text-center space-y-2">
        <p className="text-amber-800 font-medium">Creato con passione 💛</p>
        <a
          href="https://instagram.com/tricolin_handmade"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          @tricolin_handmade
        </a>
        <div className="pt-4">
          <a
            href="https://app.emergent.sh/?utm_source=emergent-badge"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition-colors"
          >
            <span className="text-xl">⚡</span>
            Made with Emergent
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
