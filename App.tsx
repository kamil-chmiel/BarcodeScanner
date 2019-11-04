import Scanner from "./src/Screens/Scanner";
import Results from "./src/Screens/Results";
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

const MainNavigator = createStackNavigator({
  Scanner: { screen: Scanner, navigationOptions: {
    header: null,
  } },
  Results: { screen: Results, navigationOptions: {
    title: "Barcode Details",
  } },
});

const App = createAppContainer(MainNavigator);

export default App;