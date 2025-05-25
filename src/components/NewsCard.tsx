
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

interface NewsCardProps {
  title: string;
  source: string;
  time: string;
  summary: string[];
  sentiment?: 'positive' | 'negative' | 'neutral';
  imageUrl?: string;
}

export function NewsCard({ 
  title, 
  source, 
  time, 
  summary, 
  sentiment = 'neutral',
  imageUrl
}: NewsCardProps) {
  const sentimentColor = {
    positive: 'bg-green-500/10 text-green-500 border-green-500/20',
    negative: 'bg-red-500/10 text-red-500 border-red-500/20',
    neutral: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  };
  
  return (
    <Card className="overflow-hidden h-full">
      <div className="relative">
        {imageUrl && (
          <div className="h-40 overflow-hidden">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <CardContent className={`pt-${imageUrl ? '0' : '5'}`}>
          <div className="flex justify-between items-center my-3">
            <Badge variant="outline" className={sentimentColor[sentiment]}>
              {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
            </Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {time}
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-3 line-clamp-2">{title}</h3>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground mb-4">
            {summary.map((point, index) => (
              <li key={index} className="line-clamp-2">{point}</li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="border-t px-6 py-3 text-xs font-medium text-muted-foreground">
          Source: {source}
        </CardFooter>
      </div>
    </Card>
  );
}
