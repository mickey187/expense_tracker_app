
import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { createExpenseApi } from "@/api/Expense";
export default  function AddExpense  () {
  const [date, setDate] = React.useState<Date | any>(null);
  const [amount, setAmount] = React.useState<number | null>(null);
  const [category, setCategory] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!amount || !category || !date) {
      alert("Please fill out all fields.");
      return;
    }

    const payload = {
      userId: "67330c201841e20342cfc531",
      amount,
      category,
      date: date.toISOString(), // Format date as ISO string
    };

    try {
      setLoading(true);
      const response = await createExpenseApi(payload);

      if (response) {
        alert("Income added successfully!");
        // Reset form
        setAmount(null);
        setCategory(null);
        setDate(null);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error adding income:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return( <>
    <div className="mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Add New Expense</CardTitle>
          {/* <CardDescription>Card Description</CardDescription> */}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount"
                    type="number"
                    placeholder="amount"
                    value={amount || ""}
                    onChange={(e) => setAmount(Number(e.target.value))} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Category</Label>
                <Select onValueChange={(value) => setCategory(value)}
                    value={category || ""}>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="rent">Rent</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                  <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" disabled={loading}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>Add</Button>
        </CardFooter>
      </Card>
    </div>
  </>);
}
