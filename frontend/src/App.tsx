import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { GlobalCss } from "./styles";
import { store, persistor } from "./store"; // Certifique-se de importar o persistor também
import { BrowserRouter } from "react-router-dom";
import Rotas from "./routes/routes";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <GlobalCss />
          <Rotas />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
