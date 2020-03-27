export const getSteps = () => {
  return [
    "Who is travelling?",
    "What type of a trip do you prefer?",
    "What would be the length of your trip?"
  ];
};

export const getStepContent = (step: number) => {
  switch (step) {
    case 0:
      return `Select the participants of your planned trip - a family with children,
                a solo traveller, a couple, group of friends, etc...`;
    case 1:
      return `Select the type of the trip you would like to have - urban, nature, 
                backpacking, skiing, etc...`;
    case 2:
      return `Select the length of your trip. Don't worry - it doesn't have to be
                exact.`;
    default:
      return "Unknown step";
  }
};
