
import React, { useEffect } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

export function Accessibility() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  // Effect to show theme change toast
  useEffect(() => {
    if (theme && resolvedTheme) {
      const displayTheme = theme === 'system' ? resolvedTheme : theme;
      toast.success(`Theme changed to ${displayTheme} mode`);
    }
  }, [theme, resolvedTheme]);
  
  const handleReducedMotionToggle = (checked: boolean) => {
    document.documentElement.classList.toggle('reduce-motion', checked);
    toast.success(`Reduced motion ${checked ? 'enabled' : 'disabled'}`);
  };
  
  const handleHighContrastToggle = (checked: boolean) => {
    document.documentElement.classList.toggle('high-contrast', checked);
    toast.success(`High contrast ${checked ? 'enabled' : 'disabled'}`);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Accessibility</CardTitle>
        <CardDescription>Manage your display and accessibility preferences.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Theme Preference</h4>
          <RadioGroup 
            defaultValue={theme || 'system'}
            onValueChange={(value) => setTheme(value)}
            className="flex flex-col space-y-3"
          >
            <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="light" id="light-theme" />
              <Label htmlFor="light-theme" className="flex items-center gap-2 cursor-pointer">
                <Sun className="h-5 w-5" />
                <div className="space-y-0.5">
                  <span className="font-medium">Light</span>
                  <p className="text-xs text-muted-foreground">Light background with darker text</p>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="dark" id="dark-theme" />
              <Label htmlFor="dark-theme" className="flex items-center gap-2 cursor-pointer">
                <Moon className="h-5 w-5" />
                <div className="space-y-0.5">
                  <span className="font-medium">Dark</span>
                  <p className="text-xs text-muted-foreground">Dark background with light text</p>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="system" id="system-theme" />
              <Label htmlFor="system-theme" className="flex items-center gap-2 cursor-pointer">
                <Monitor className="h-5 w-5" />
                <div className="space-y-0.5">
                  <span className="font-medium">System</span>
                  <p className="text-xs text-muted-foreground">Follow your system preferences</p>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="flex items-center justify-between py-2 border-t pt-4">
          <div className="space-y-0.5">
            <Label htmlFor="reduced-motion">Reduced Motion</Label>
            <CardDescription>Minimize animations in the interface</CardDescription>
          </div>
          <Switch 
            id="reduced-motion" 
            onCheckedChange={handleReducedMotionToggle}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="high-contrast">High Contrast</Label>
            <CardDescription>Increase contrast for better readability</CardDescription>
          </div>
          <Switch 
            id="high-contrast" 
            onCheckedChange={handleHighContrastToggle}
          />
        </div>
      </CardContent>
    </Card>
  );
}
