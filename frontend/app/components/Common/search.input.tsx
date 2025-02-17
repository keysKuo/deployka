import React from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export function SearchInput() {
    return <div className="relative w-full max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <Input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
}
