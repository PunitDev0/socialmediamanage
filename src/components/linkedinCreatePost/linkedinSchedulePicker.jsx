import { Controller } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function SchedulePicker({ control, watch, errors }) {
  const selectedDateTime = watch("dateTime"); // Watch the combined date and time field

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-3"
    >
      <label className="text-sm font-medium text-gray-700">Schedule Post</label>
      <div className="flex flex-col gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full sm:w-64 justify-start text-left font-medium text-gray-800 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 transition-all duration-300 shadow-sm border border-gray-200 rounded-lg py-2.5",
                !selectedDateTime && "text-gray-500"
              )}
            >
              <CalendarIcon className="mr-2 h-5 w-5 text-indigo-500" />
              {selectedDateTime ? (
                format(new Date(selectedDateTime), "MMM dd, yyyy, hh:mm a")
              ) : (
                <span>Pick date & time</span>
              )}
            </Button>
          </PopoverTrigger>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <PopoverContent className="p-4 bg-white rounded-lg shadow-xl border border-gray-100">
              <Controller
                name="dateTime"
                control={control}
                rules={{ required: "Date and time are required" }}
                render={({ field }) => (
                  <input
                    type="datetime-local"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    className={cn(
                      "w-full border border-gray-300 rounded-md p-3 text-sm text-gray-800 bg-gray-50 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200",
                      errors.dateTime && "border-red-400 focus:ring-red-400"
                    )}
                  />
                )}
              />
            </PopoverContent>
          </motion.div>
        </Popover>
        {errors.dateTime && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-red-500 text-xs font-medium"
          >
            {errors.dateTime.message}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}