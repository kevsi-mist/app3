
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface MarketAlert {
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
}

interface MarketAlertsProps {
  alerts: MarketAlert[];
}

export function MarketAlerts({ alerts }: MarketAlertsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          <CardTitle className="text-lg">Market Alerts</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {alerts.map((alert, idx) => (
            <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-card/50">
              <div className={`p-1.5 rounded-full ${
                alert.severity === "high" 
                  ? "bg-red-500/10 text-red-500" 
                  : alert.severity === "medium" 
                  ? "bg-yellow-500/10 text-yellow-500" 
                  : "bg-blue-500/10 text-blue-500"
              }`}>
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-sm">{alert.title}</p>
                <p className="text-sm text-muted-foreground">{alert.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
