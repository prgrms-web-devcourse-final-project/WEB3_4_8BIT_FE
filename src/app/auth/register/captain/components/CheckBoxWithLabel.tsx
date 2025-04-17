import {Checkbox} from "@/components/ui/checkbox";
import React from "react";

export default function CheckboxWithLabel({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (label: string) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
      <Checkbox
        id={label}
        checked={checked}
        onCheckedChange={() => onChange(label)}
      />
      <span>{label}</span>
    </label>
  );
}