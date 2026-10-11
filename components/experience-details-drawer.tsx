"use client"

import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

type ExperienceDetailsDrawerProps = {
  role: string
  company: string
  period: string
  description: string
  technologies: string[]
  details: string[]
}

export function ExperienceDetailsDrawer({
  role,
  company,
  period,
  description,
  technologies,
  details,
}: ExperienceDetailsDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="mt-3 h-auto gap-1 px-0 py-1 text-xs text-muted-foreground hover:bg-transparent hover:text-foreground"
        >
          More info
          <ChevronRight size={13} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85dvh]">
        <div className="mx-auto flex max-h-[calc(85dvh-1.5rem)] w-full max-w-3xl min-h-0 flex-col overflow-hidden">
          <DrawerHeader className="border-b border-border px-6 pb-5 text-left">
            <DrawerTitle className="text-lg">{role} at {company}</DrawerTitle>
            <p className="text-xs text-muted-foreground">{period}</p>
            <DrawerDescription className="max-w-2xl text-xs leading-relaxed">
              {description}
            </DrawerDescription>
          </DrawerHeader>

          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Details
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed">
              {details.map((detail) => (
                <li key={detail} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-foreground" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>

          <DrawerFooter className="border-t border-border px-6 py-4 sm:flex sm:flex-row sm:justify-end">
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
