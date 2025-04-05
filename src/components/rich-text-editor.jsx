"use client";
import React from "react"

import { useState } from "react"
import { Bold, Italic, Link, List, ListOrdered, Quote, Undo } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function RichTextEditor({
  value,
  onChange,
  placeholder
}) {
  const [selectionStart, setSelectionStart] = useState(0)
  const [selectionEnd, setSelectionEnd] = useState(0)
  const textareaRef = React.useRef(null)

  const handleSelect = (e) => {
    const target = e.target
    setSelectionStart(target.selectionStart)
    setSelectionEnd(target.selectionEnd)
  }

  const applyFormatting = (prefix, suffix = prefix) => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    const start = selectionStart
    const end = selectionEnd
    const selectedText = value.substring(start, end)
    const beforeText = value.substring(0, start)
    const afterText = value.substring(end)

    const newText = beforeText + prefix + selectedText + suffix + afterText
    onChange(newText)

    // Set focus back to textarea and restore selection
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + prefix.length, end + prefix.length)
    }, 0)
  }

  const formatBold = () => applyFormatting("**")
  const formatItalic = () => applyFormatting("*")
  const formatLink = () => {
    const selectedText = value.substring(selectionStart, selectionEnd)
    applyFormatting(`[${selectedText}](`, ")")
  }
  const formatQuote = () => applyFormatting("> ")
  const formatBulletList = () => applyFormatting("- ")
  const formatNumberedList = () => applyFormatting("1. ")
  const undoAction = () => {
    // This is a simple undo - in a real app you'd want to track history
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }

  return (
    (<div className="space-y-2">
      <div className="flex flex-wrap gap-1 p-1 border rounded-md bg-muted/30">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={formatBold}>
                <Bold className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={formatItalic}>
                <Italic className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Italic</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={formatLink}>
                <Link className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Link</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={formatQuote}>
                <Quote className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Quote</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={formatBulletList}>
                <List className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bullet List</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={formatNumberedList}>
                <ListOrdered className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Numbered List</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={undoAction}>
                <Undo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onSelect={handleSelect}
        placeholder={placeholder || "What do you want to share?"}
        className="min-h-[150px] resize-none" />
    </div>)
  );
}

