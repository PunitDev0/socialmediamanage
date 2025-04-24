import { Controller } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function SchedulePicker({ control, watch, errors }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Schedule Post</p>
      <div className="flex gap-2 flex-col">
        {/* Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !watch("date") && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {watch("date") ? format(watch("date"), "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Controller
              name="date"
              control={control}
              rules={{ required: "Date is required" }}
              render={({ field }) => (
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                />
              )}
            />
          </PopoverContent>
        </Popover>
        {errors.date && (
          <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
        )}

        {/* Time Picker */}
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <Controller
            name="time"
            control={control}
            rules={{ required: "Time is required" }}
            render={({ field }) => (
              <input
                type="time"
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value)}
                className={cn(
                  "w-[110px] border rounded-md p-2 text-sm",
                  errors.time && "border-red-500"
                )}
              />
            )}
          />
        </div>
        {errors.time && (
          <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>
        )}
      </div>
    </div>
  );
}