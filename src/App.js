import RouteApp from "./routes/index"
import { StyledEngineProvider } from "@mui/material/styles";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <RouteApp />
    </StyledEngineProvider>
  );
}

export default App;
