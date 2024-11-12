
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout';
import { ThemeProvider } from "@/components/theme-provider"
import AddExpense from './pages/AddExpense';
import ViewIncome from './pages/ViewIncome';


function App() {


  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
       <Router>
        <Layout/>
    
    </Router>
    </ThemeProvider>
     
    </>
  )
}

export default App
