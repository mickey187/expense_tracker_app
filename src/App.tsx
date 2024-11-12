
import './App.css'
import { BrowserRouter as Router  } from 'react-router-dom';
import Layout from './layout';
import { ThemeProvider } from "@/components/theme-provider"



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
