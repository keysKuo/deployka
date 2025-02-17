import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function SortPicker() {
    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by activity" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem defaultChecked value="apple">Sort by activity</SelectItem>
                    <SelectItem value="banana">Sort by name</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
