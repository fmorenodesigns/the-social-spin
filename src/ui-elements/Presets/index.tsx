import "./styles.scss";

interface Props {
  setEntries: React.Dispatch<React.SetStateAction<string>>;
}

export default function Presets({ setEntries }: Props) {
  return (
    <div id="presets">
      <div id="preset-buttons">
        {PRESETS.map((preset) => {
          return (
            <button
              key={preset.buttonText}
              className="preset"
              onClick={() => setEntries(preset.presetOptions.join(", "))}
            >
              {preset.buttonText}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const PRESETS = [
  {
    buttonText: "Yep/Nope",
    presetOptions: ["Yep", "Nope"],
  },
  {
    buttonText: "What to do?",
    presetOptions: [
      "Gaming",
      "Movie",
      "Series",
      "Nap",
      "Call a friend",
      "Book",
      "Draw",
      "Exercise",
    ],
  },
  {
    buttonText: "Movies",
    presetOptions: [
      "Comedy",
      "Romance",
      "Action",
      "Musical",
      "Sci-Fi",
      "Fantasy",
      "Thriller",
      "Horror",
    ],
  },
  {
    buttonText: "Food",
    presetOptions: [
      "Pizza",
      "Hamburguer",
      "Sushi",
      "Pasta",
      "Salad",
      "Soup",
      "Sandwich",
    ],
  },
  {
    buttonText: "Dessert",
    presetOptions: [
      "Cake",
      "Waffles",
      "Brownies",
      "Gelatine",
      "Fruit",
      "Ice cream",
      "Yoghurt",
    ],
  },
  {
    buttonText: "Exercise",
    presetOptions: [
      "Stretch",
      "Squats",
      "Push-ups",
      "Sit-ups",
      "Rope skipping",
      "Jogging",
      "Short walk",
      "Weight-lifting",
    ],
  },
];
