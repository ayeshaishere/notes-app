import { useSelector } from "react-redux"
import LoginPage from "./pages/LoginPage"
import NotesDashboard from "./pages/NotesDashboard"

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  return <div className="App">{isAuthenticated ? <NotesDashboard /> : <LoginPage />}</div>
}

export default App
