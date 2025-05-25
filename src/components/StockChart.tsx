
import React from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from '@/components/ui/card';
import { BadgeIndianRupee } from 'lucide-react';

interface StockChartProps {
  data: {
    name: string;
    value: number;
    fiscalValue?: number; // Added fiscal value
    pv?: number; // Previous value
  }[];
  title: string;
  subtext?: string;
  height?: number;
  trend?: 'up' | 'down';
  percentage?: string;
  showTooltip?: boolean;
  useFiscalPrice?: boolean; // Flag to determine which value to use
}

export function StockChart({ 
  data, 
  title, 
  subtext, 
  height = 200, 
  trend = 'up',
  percentage,
  showTooltip = true,
  useFiscalPrice = true // Default to fiscal price
}: StockChartProps) {
  const gradientId = React.useId();
  const color = trend === 'up' ? 'rgba(74, 222, 128, 1)' : 'rgba(248, 113, 113, 1)';
  const colorTransparent = trend === 'up' ? 'rgba(74, 222, 128, 0)' : 'rgba(248, 113, 113, 0)';
  
  // Process data to use fiscal values if available
  const processedData = data.map(item => ({
    ...item,
    displayValue: useFiscalPrice && item.fiscalValue !== undefined ? item.fiscalValue : item.value
  }));
  
  return (
    <Card className="p-4 h-full">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          {subtext && <p className="text-xl font-semibold">{subtext}</p>}
        </div>
        {percentage && (
          <div className={`text-sm font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {trend === 'up' ? '+' : ''}{percentage}
          </div>
        )}
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={processedData}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.5} />
              <stop offset="100%" stopColor={colorTransparent} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10 }}
            tickFormatter={(value) => value}
            dy={10}
            opacity={0.5}
          />
          <YAxis 
            hide={true}
            domain={['dataMin - 5', 'dataMax + 5']} 
          />
          {showTooltip && (
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'rgba(17, 24, 39, 0.8)', 
                border: 'none',
                borderRadius: '0.5rem',
                padding: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              itemStyle={{ color: '#ffffff' }}
              labelStyle={{ color: '#9ca3af' }}
              formatter={(value) => [`₹${value}`, 'Price']}
              labelFormatter={(label) => `${label}`}
            />
          )}
          <Area 
            type="monotone" 
            dataKey="displayValue" 
            stroke={color}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
