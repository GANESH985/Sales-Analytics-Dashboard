import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Calendar } from 'lucide-react';
import { format, subDays, subMonths } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

interface DateRangeSelectorProps {
  startDate: Date;
  endDate: Date;
  onChange: (startDate: Date, endDate: Date) => void;
}

const presetRanges = [
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 30 days', days: 30 },
  { label: 'Last 90 days', days: 90 },
  { label: 'Last 6 months', months: 6 },
  { label: 'Last year', months: 12 },
];

export default function DateRangeSelector({ startDate, endDate, onChange }: DateRangeSelectorProps) {
  const [showCustom, setShowCustom] = useState(false);

  const handlePresetClick = (preset: any) => {
    const end = new Date();
    let start: Date;
    
    if (preset.days) {
      start = subDays(end, preset.days);
    } else if (preset.months) {
      start = subMonths(end, preset.months);
    } else {
      return;
    }
    
    onChange(start, end);
    setShowCustom(false);
  };

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex flex-wrap gap-2 justify-start sm:justify-end">
        {presetRanges.map((preset) => (
          <button
            key={preset.label}
            onClick={() => handlePresetClick(preset)}
            className="px-2 sm:px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors whitespace-nowrap"
          >
            {preset.label}
          </button>
        ))}
        <button
          onClick={() => setShowCustom(!showCustom)}
          className={`px-2 sm:px-3 py-1 text-xs font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap ${
            showCustom 
              ? 'bg-blue-100 text-blue-700 border border-blue-300' 
              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Custom Range
        </button>
      </div>

      <div className="flex items-center justify-center sm:justify-end text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-md">
        <Calendar className="h-4 w-4 mr-2" />
        {format(startDate, 'MMM dd')} - {format(endDate, 'MMM dd, yyyy')}
      </div>
      {showCustom && (
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => onChange(date, endDate)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            maxDate={endDate}
            dateFormat="MMM dd, yyyy"
            className="w-full sm:w-auto px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholderText="Start date"
          />
          <span className="text-gray-400 hidden sm:inline">to</span>
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => onChange(startDate, date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            maxDate={new Date()}
            dateFormat="MMM dd, yyyy"
            className="w-full sm:w-auto px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholderText="End date"
          />
        </div>
      )}
    </div>
  );
}