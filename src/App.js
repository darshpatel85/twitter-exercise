import AppRoutes from "./pages/AppRoutes";
import { Provider } from "react-redux";
import "./styles.css";
import store from "./store/store";

export default function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}
