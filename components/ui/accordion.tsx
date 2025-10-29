'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AccordionItemProps {
  title: string
  description: string
  link: string
  technologies: string[]
  isOpen?: boolean
  onToggle?: (isOpen: boolean) => void
}

export function AccordionItem({
  title,
  description,
  link,
  technologies,
  isOpen: controlledIsOpen,
  onToggle
}: AccordionItemProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen

  const handleToggle = () => {
    const newState = !isOpen
    setInternalIsOpen(newState)
    onToggle?.(newState)
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden transition-all duration-200 hover:border-border/80 dark:hover:border-border/60">
      <button
        onClick={handleToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 dark:hover:bg-muted/30 transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <ChevronDown
          size={20}
          className={cn(
            'text-muted-foreground transition-transform duration-300',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div className="border-t border-border bg-muted/20 dark:bg-muted/10 px-6 py-4 animate-fadeIn">
          <div className="space-y-4">
            <p className="text-sm text-foreground/80 leading-relaxed">
              {description}
            </p>

            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="inline-block px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary/90 rounded-full text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 dark:hover:text-primary/70 transition-colors duration-200 mt-2"
            >
              Visit Project
              <span className="text-xs">↗</span>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

interface AccordionProps {
  items: AccordionItemProps[]
}

export function Accordion({ items }: AccordionProps) {
  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <AccordionItem key={idx} {...item} />
      ))}
    </div>
  )
}
