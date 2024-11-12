
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout';
import { ThemeProvider } from "@/components/theme-provider"
import store from './store/store.ts';
import { Provider } from '@radix-ui/react-tooltip';


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
