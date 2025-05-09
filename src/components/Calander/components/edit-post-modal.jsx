"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function EditPostModal({ post, isOpen, onClose, onUpdate }) {
  const [editedPost, setEditedPost] = useState({ ...post });

  const handleChange = (field, value) => {
    setEditedPost((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onUpdate(editedPost);
  };

  const formatDateForInput = (dateString) => {
    const date = parseISO(dateString);
    return format(date, "yyyy-MM-dd'T'HH:mm");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={editedPost.title} onChange={(e) => handleChange("title", e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="platform">Platform</Label>
            <Select value={editedPost.platform} onValueChange={(value) => handleChange("platform", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              rows={4}
              value={editedPost.content}
              onChange={(e) => handleChange("content", e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="scheduledTime">Scheduled Time</Label>
            <Input
              id="scheduledTime"
              type="datetime-local"
              value={formatDateForInput(editedPost.scheduledTime)}
              onChange={(e) => handleChange("scheduledTime", new Date(e.target.value).toISOString())}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}