const experienceLevels = [
  { level: "principiante", label: "Principiante", rate: 8, description: "Sto ancora imparando" },
  { level: "intermedio", label: "Intermedio", rate: 15, description: "Ho buona esperienza" },
  { level: "esperto", label: "Esperto", rate: 25, description: "Sono un professionista" }
];

const ExperienceSelector = ({ experienceLevel, setExperienceLevel, hourlyRate, setHourlyRate }) => {
  const handleExperienceChange = (level, defaultRate) => {
    setExperienceLevel(level);
    setHourlyRate(defaultRate);
  };

  return (
    <div>
      <label className="text-sm font-medium text-stone-500 mb-3 block uppercase tracking-wider">
        Livello Esperienza
      </label>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {experienceLevels.map((exp) => (
          <div
            key={exp.level}
            onClick={() => handleExperienceChange(exp.level, exp.rate)}
            className={`experience-option text-center ${
              experienceLevel === exp.level ? "selected" : ""
            }`}
            data-testid={`experience-${exp.level}`}
          >
            <div className="font-medium text-sm text-stone-700">{exp.label}</div>
            <div className="font-mono text-xs text-stone-500 mt-1">€{exp.rate}/h</div>
          </div>
        ))}
      </div>

      <div>
        <label className="text-sm font-medium text-stone-500 mb-1.5 block uppercase tracking-wider">
          Tariffa Oraria Personalizzata (€)
        </label>
        <input
          type="number"
          step="0.5"
          min="0"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)}
          className="input-field w-full"
          placeholder="15.00"
          data-testid="hourly-rate-input"
        />
        <p className="text-xs text-stone-400 mt-1">
          Modifica la tariffa se necessario
        </p>
      </div>
    </div>
  );
};

export default ExperienceSelector;
