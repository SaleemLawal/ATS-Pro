import React, { useState } from "react";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { cn } from "@/lib/utils";

const jobRoles = [
  { value: "software_engineer", label: "Software Engineer" },
  { value: "frontend_developer", label: "Frontend Developer" },
  { value: "backend_developer", label: "Backend Developer" },
  { value: "fullstack_developer", label: "Full Stack Developer" },
  { value: "data_scientist", label: "Data Scientist" },
  { value: "data_analyst", label: "Data Analyst" },
  { value: "product_manager", label: "Product Manager" },
  { value: "project_manager", label: "Project Manager" },
  { value: "ui_ux_designer", label: "UI/UX Designer" },
  { value: "marketing_specialist", label: "Marketing Specialist" },
  { value: "content_writer", label: "Content Writer" },
  { value: "sales_representative", label: "Sales Representative" },
];

interface JobRoleSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function JobRoleSelector({
  value,
  onChange,
}: JobRoleSelectorProps) {
  const [open, setOpen] = useState(false);
  const selectedRole = jobRoles.find((role) => role.value === value);
  return (
    <div className="flex flex-col space-y-1.5">
      <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Target Job Role
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            className="justify-between"
            variant="outline"
            role="combobox"
            aria-expanded={open}
          >
            {selectedRole ? selectedRole.label : "Select job role..."}
            <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="md:min-w-[450px] p-0">
          <Command className="border rounded-lg shadow-md ">
            <CommandInput placeholder="Search job role..." />
            <CommandList>
              <CommandEmpty>No job role found.</CommandEmpty>
              <CommandGroup>
                {jobRoles.map((role) => (
                  <CommandItem
                    key={role.value}
                    value={role.value}
                    onSelect={(currentValue) => {
                      onChange(currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === role.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {role.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <p className="text-xs text-muted-foreground">
        Select the job role you're targeting to get tailored resume analysis
      </p>
    </div>
  );
}
