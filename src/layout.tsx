import { Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import AddExpense from "./pages/AddExpense";
import ViewIncome from "./pages/ViewIncome";
import AddIncome from "./pages/AddIncome";
import Dashboard from "./pages/Dashboard";
import ViewExpense from "./pages/ViewExpense";
import { ModeToggle } from './components/mode-toggle';

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex w-screen">
        <div className="w-1/4">
          <AppSidebar />
          
        </div>
        <SidebarTrigger />
        
        <main className="w-3/4">
        <div className="float-right mb-5">
        <ModeToggle/>
        </div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-income" element={<AddIncome />} />
            <Route path="/view-income" element={<ViewIncome />} />
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/view-expense" element={<ViewExpense />} />
            <Route path="/search" element={<AddExpense />} />
            <Route path="/settings" element={<AddExpense />} />
          </Routes>
        </main>
      </div>
    </SidebarProvider>
  );
}
