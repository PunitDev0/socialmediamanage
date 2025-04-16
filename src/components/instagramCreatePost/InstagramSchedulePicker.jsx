import { Controller } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function InstagramSchedulePicker({ control, watch, errors }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Post Schedule Karein</p>
      <div className="flex gap-2 flex-col">
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
              {watch("date") ? format(watch("date"), "PPP") : "Date chunein"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Controller
              name="date"
              control={control}
              rules={{ required: "Date zaroori hai" }}
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

        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <Controller
            name="time"
            control={control}
            rules={{ required: "Time zaroori hai" }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-[110px]">
                  <SelectValue placeholder="Time chunein" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }).map((_, hour) =>
                    [0, 30].map((minute) => {
                      const formattedHour = hour.toString().padStart(2, "0");
                      const formattedMinute = minute.toString().padStart(2, "0");
                      const timeValue = `${formattedHour}:${formattedMinute}`;
                      return (
                        <SelectItem key={timeValue} value={timeValue}>
                          {timeValue}
                        </SelectItem>
                      );
                    })
                  )}
                </SelectContent>
              </Select>
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