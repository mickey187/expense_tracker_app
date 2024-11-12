import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { getExpenseByMonthApi, getTotalExpenseApi } from "@/api/Expense";
import { getCurrentBalanceApi, getCurrentBalanceFxApi, getIncomeByMonthApi, getTotalIncomeApi } from "@/api/Income";

const incomeChartConfig = {
  desktop: {
    label: "Desktop",
    // color: "hsl(var(--chart-1))",
    color: "#22c55e",
  },
} satisfies ChartConfig;

const expenseChartConfig = {
  desktop: {
    label: "Desktop",
    // color: "hsl(var(--chart-1))",
    color: "#ef4444",
  },
} satisfies ChartConfig;

export default function Dashboard() {
  const [incomeAggregate, setIncomeAggregate] = useState<number | 0>();
  const [expenseAggregate, setExpenseAggregate] = useState<number | 0>();
  const [balance, setBalance] = useState<number | 0>();
  const [balanceFxEUR, setBalanceFxEUR] = useState<number | 0>();
  const [balanceFxETB, setBalanceFxETB] = useState<number | 0>();
  const [incomeByMonth, setIncomeByMonth] = useState<[]>();
  const [expenseByMonth, setExpenseByMonth] = useState<[]>();

  useEffect(() => {
    try {
      const userId = "67330c201841e20342cfc531";
      const fetchData = async () => {
        const totalIncome = await getTotalIncomeApi(userId);
        setIncomeAggregate(totalIncome);
        const totalExpense = await getTotalExpenseApi(userId);
        setExpenseAggregate(totalExpense);
        const currentBalance = await getCurrentBalanceApi(userId);
        setBalance(currentBalance);
        const incomeByMonthData = await getIncomeByMonthApi(userId); 
        setIncomeByMonth(incomeByMonthData);
        const expenseByMonthData = await getExpenseByMonthApi(userId); 
        setExpenseByMonth(expenseByMonthData);
        const balanceFxData = await getCurrentBalanceFxApi(userId);
        setBalanceFxEUR(balanceFxData.balanceEUR);
        setBalanceFxETB(balanceFxData.balanceETB);
        console.log("balanceFx",  balanceFxData.balanceUSD);
        


        
        
        
      };
      fetchData();
    } catch (error:any) {
      console.error("error getting data for dashboard",error.message)
    }
  }, []);
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-10 ">
        {/* <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between pb-2 space-y-0">
            <h3 className="tracking-tight text-sm font-medium overflow-hidden text-ellipsis whitespace-nowrap">
              Incomes in this period
            </h3>
            <svg
              aria-hidden="true"
              focusable="false"
              data-icon="incomes"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
              viewBox="0 0 958.736 958.736"
              fill="currentColor"
              className="w-6 h-6 text-muted-foreground"
            >
              <path d="M95.5 944.268h63.8c27.6 0 50-22.399 50-50v-164.3c-53.2 7.8-107.9 12.7-162.9 14.4h-1v149.8c.1 27.7 22.5 50.1 50.1 50.1zM389.1 944.268c27.601 0 50-22.399 50-50v-219.5c-26.5 9.101-54 17.4-81.699 24.801-24.801 6.6-50.4 12.6-75.9 17.8-2 .399-4.1.8-6.2 1.2v175.6c0 27.6 22.4 50 50 50h63.8v.099zM618.7 944.268c27.6 0 50-22.399 50-50v-330.4c-4.8 3.2-9.601 6.3-14.5 9.3-42.3 26.6-88.4 50.7-137.101 71.6-4 1.7-8.1 3.4-12.199 5.101v244.3c0 27.6 22.399 50 50 50h63.8v.099zM898.4 894.268v-577.8c-10.101 20.5-21.801 40.7-35 60.4-29.101 43.3-65.5 84.3-108.4 121.8-6.6 5.8-13.4 11.5-20.4 17.2v378.5c0 27.6 22.4 50 50 50h63.8c27.6-.1 50-22.5 50-50.1zM25.2 713.868h.4c6.7-.101 13.3-.3 20-.5 55.6-1.7 110.3-6.7 163.8-14.7 22.2-3.3 44.1-7.2 65.9-11.6 25-5.101 49.7-10.9 74.101-17.4 30.8-8.2 60.699-17.4 89.699-27.7 22.5-8 44.5-16.5 65.9-25.7 47.3-20.3 91.7-43.399 132.8-69.3 10.601-6.7 21-13.5 31-20.5 23.5-16.3 45.5-33.399 65.9-51.2 40.899-35.699 75.399-74.399 103.1-115.7 27.8-41.4 48.101-84.4 60.7-128.5 5.7-19.9 9.8-39.9 12.4-60.2h22.8c20.1 0 32-22.6 20.6-39.2l-73.5-106.5c-5-7.2-12.8-10.8-20.6-10.8s-15.601 3.6-20.601 10.8l-73.399 106.5c-11.4 16.6.399 39.2 20.6 39.2h22.9c-7.8 45.6-26.2 90.2-55 133-6.3 9.3-13 18.5-20.101 27.5-18.899 24-40.899 46.899-65.899 68.7-25.2 22-53.3 42.8-84.3 62.399-25.101 15.8-51.601 30.5-79.5 44-21.2 10.3-43.2 19.9-65.9 28.8-36.6 14.4-75.2 27-115.5 37.801-16 4.3-32.1 8.199-48.4 11.8-21.7 4.8-43.7 9-65.9 12.6-53.4 8.7-108.1 14-163.8 15.9-6.9.2-13.8.399-20.8.5-13.6.3-24.6 11.3-24.6 25v50c.2 13.8 11.4 25 25.2 25z"></path>
            </svg>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold text-green-600">+799.99€</div>
            <p className="text-xs text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="font-bold">2 </span>income transactions
            </p>
          </div>
        </div> */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${incomeAggregate}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expense</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${expenseAggregate}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Balance</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${balance}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Balance (Fx)</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€ {balanceFxEUR}</div>
            <p className="text-md text-muted-foreground">
              ETB {balanceFxETB}
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-row mt-10 gap-5">
        <div className="w-1/2">
          <Card>
            <CardHeader>
              <CardTitle>Income Chart</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={incomeChartConfig}>
                <BarChart accessibilityLayer data={incomeByMonth}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar
                    dataKey="income"
                    fill="var(--color-desktop)"
                    radius={8}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total visitors for the last 6 months
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="w-1/2">
          <Card>
            <CardHeader>
              <CardTitle>Expense Chart</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={expenseChartConfig}>
                <BarChart accessibilityLayer data={expenseByMonth}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar
                    dataKey="expense"
                    fill="var(--color-desktop)"
                    radius={8}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total visitors for the last 6 months
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
