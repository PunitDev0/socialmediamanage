import { Controller } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PinterestPostSettings({ control, watch }) {
  const postType = watch("postType");
  const boards = ["Inspiration", "Recipes", "Travel", "Fashion", "DIY"]; // Replace with dynamic board fetch

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Pin Settings</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* <Pinterest className="h-4 w-4" /> */}
                <span className="text-sm">Pinterest</span>
              </div>
            </div>

            {postType === "standard" && (
              <div className="flex items-center justify-between">
                <Label htmlFor="board" className="text-sm">
                  Board
                </Label>
                <Controller
                  name="board"
                  control={control}
                  rules={{ required: "Board is required" }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Select board" />
                      </SelectTrigger>
                      <SelectContent>
                        {boards.map((board) => (
                          <SelectItem key={board} value={board}>
                            {board}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}