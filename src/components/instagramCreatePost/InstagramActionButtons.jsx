import { Button } from "@/components/ui/button";
import { Save, Send } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function InstagramActionButtons({
  handleSubmit,
  saveAsDraft,
  isSaving,
  isScheduling,
  saveSuccess,
}) {
  return (
    <div className="flex justify-end gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={handleSubmit(saveAsDraft)}
        disabled={isSaving}
      >
        {isSaving ? (
          <>Saving...</>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Draft Save Karein
          </>
        )}
      </Button>
      <AnimatePresence>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute right-20 bottom-4 bg-green-500 text-white px-3 py-1 rounded-md text-sm"
          >
            Draft save ho gaya!
          </motion.div>
        )}
      </AnimatePresence>
      <Button type="submit" disabled={isScheduling}>
        {isScheduling ? (
          <>Scheduling...</>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Post Schedule Karein
          </>
        )}
      </Button>
    </div>
  );
}