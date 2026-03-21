import { useState } from "react";
import "@/App.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PriceCalculator from "@/components/PriceCalculator";
import ProfitCalculator from "@/components/ProfitCalculator";
import WorkTimeCalculator from "@/components/WorkTimeCalculator";
import IncomeGoalCalculator from "@/components/IncomeGoalCalculator";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Clock, Target, Instagram } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-cream paper-texture py-8 px-4 sm:py-12">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="tape-strip"></div>
          <h1 className="font-serif text-4xl sm:text-5xl text-charcoal mb-3 tracking-tight">
            Business Toolkit
          </h1>
          <p className="text-stone-600 text-base">
            Strumenti essenziali per artigiani e creativi
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Tabs defaultValue="price" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6 bg-white/80 backdrop-blur-sm border border-stone-200 rounded-xl p-1.5 shadow-sm gap-1">
              <TabsTrigger 
                value="price" 
                className="data-[state=active]:bg-sage data-[state=active]:text-white rounded-lg transition-all flex items-center gap-1.5 text-xs sm:text-sm px-2 py-2"
                data-testid="tab-price"
              >
                <Calculator size={16} className="hidden sm:block" />
                <span>Prezzo</span>
              </TabsTrigger>
              <TabsTrigger 
                value="profit" 
                className="data-[state=active]:bg-sage data-[state=active]:text-white rounded-lg transition-all flex items-center gap-1.5 text-xs sm:text-sm px-2 py-2"
                data-testid="tab-profit"
              >
                <TrendingUp size={16} className="hidden sm:block" />
                <span>Guadagno</span>
              </TabsTrigger>
              <TabsTrigger 
                value="worktime" 
                className="data-[state=active]:bg-sage data-[state=active]:text-white rounded-lg transition-all flex items-center gap-1.5 text-xs sm:text-sm px-2 py-2"
                data-testid="tab-worktime"
              >
                <Clock size={16} className="hidden sm:block" />
                <span>Tempo</span>
              </TabsTrigger>
              <TabsTrigger 
                value="goal" 
                className="data-[state=active]:bg-sage data-[state=active]:text-white rounded-lg transition-all flex items-center gap-1.5 text-xs sm:text-sm px-2 py-2"
                data-testid="tab-goal"
              >
                <Target size={16} className="hidden sm:block" />
                <span>Obiettivo</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="price">
              <PriceCalculator />
            </TabsContent>

            <TabsContent value="profit">
              <ProfitCalculator />
            </TabsContent>

            <TabsContent value="worktime">
              <WorkTimeCalculator />
            </TabsContent>

            <TabsContent value="goal">
              <IncomeGoalCalculator />
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 pt-8 border-t border-stone-200"
        >
          <div className="text-center">
            <p className="text-stone-500 text-sm mb-3">
              Creato con passione per artigiani creativi
            </p>
            <a
              href="https://www.instagram.com/tricolin_handmade?igsh=aTEzYmxzbjM0ano2&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sage hover:text-sage-dark transition-colors group"
              data-testid="instagram-link"
            >
              <Instagram size={20} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">@tricolin_handmade</span>
            </a>
            <p className="text-stone-400 text-xs mt-2">
              Scopri i miei articoli in tricotin fatti a mano
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;
