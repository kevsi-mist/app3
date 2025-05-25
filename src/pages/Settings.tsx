import React from 'react';
import { SidebarNav } from '@/components/SidebarNav';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Bell, UserCog, Lock, Globe, Sun } from 'lucide-react';
import { toast } from 'sonner';
import { Accessibility } from '@/components/Accessibility';

type SettingsFormValues = {
  name: string;
  email: string;
  notifications: {
    marketing: boolean;
    updates: boolean;
    alerts: boolean;
  };
};

const Settings = () => {
  const form = useForm<SettingsFormValues>({
    defaultValues: {
      name: 'Keval Mistry',
      email: 'keval@example.com',
      notifications: {
        marketing: true,
        updates: true,
        alerts: false
      }
    }
  });

  const onSubmit = (data: SettingsFormValues) => {
    toast.success('Settings saved successfully');
    console.log('Form data:', data);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#121212] text-white">
      
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-semibold">Settings</h1>
            <p className="text-[#cccccc]">Manage your account settings and preferences.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
            <div className="space-y-4">
              <Card className="bg-[#121212] border border-[#1e1e1e] rounded-2xl shadow-md hover:shadow-blue-500/10 transition-shadow">
                <CardContent className="p-0">
                  <nav className="flex flex-col">
                    <a href="#profile" className="flex items-center gap-2 p-3 text-sm rounded-md transition-colors hover:bg-[#1a1a1a] hover:text-white text-[#cccccc]">
                      <UserCog className="h-4 w-4 text-[#3b7cc9]" /> Profile
                    </a>
                    <a href="#notifications" className="flex items-center gap-2 p-3 text-sm rounded-md transition-colors hover:bg-[#1a1a1a] hover:text-white text-[#cccccc]">
                      <Bell className="h-4 w-4 text-[#3b7cc9]" /> Notifications
                    </a>
                    <a href="#security" className="flex items-center gap-2 p-3 text-sm rounded-md transition-colors hover:bg-[#1a1a1a] hover:text-white text-[#cccccc]">
                      <Lock className="h-4 w-4 text-[#3b7cc9]" /> Security
                    </a>
                    <a href="#accessibility" className="flex items-center gap-2 p-3 text-sm rounded-md transition-colors hover:bg-[#1a1a1a] hover:text-white text-[#cccccc]">
                      <Sun className="h-4 w-4 text-[#3b7cc9]" /> Accessibility
                    </a>
                    <a href="#language" className="flex items-center gap-2 p-3 text-sm rounded-md transition-colors hover:bg-[#1a1a1a] hover:text-white text-[#cccccc]">
                      <Globe className="h-4 w-4 text-[#3b7cc9]" /> Language
                    </a>
                  </nav>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <Card id="profile" className="bg-[#121212] border border-[#1e1e1e] rounded-2xl shadow-md">
                    <CardHeader>
                      <CardTitle>Profile</CardTitle>
                      <CardDescription>Update your personal information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input {...field} className="bg-[#1a1a1a] border border-[#2c2c2c] text-white placeholder:text-[#777] focus:ring-2 focus:ring-[#3b7cc9] rounded-xl" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" className="bg-[#1a1a1a] border border-[#2c2c2c] text-white placeholder:text-[#777] focus:ring-2 focus:ring-[#3b7cc9] rounded-xl" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  <Card id="notifications" className="bg-[#121212] border border-[#1e1e1e] rounded-2xl shadow-md">
                    <CardHeader>
                      <CardTitle>Notifications</CardTitle>
                      <CardDescription>Configure how you receive notifications.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {(['marketing', 'updates', 'alerts'] as const).map((key) => (
                        <FormField
                          key={key}
                          control={form.control}
                          name={`notifications.${key}` as `notifications.marketing` | `notifications.updates` | `notifications.alerts`}
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-[#2c2c2c] p-4">
                              <FormControl>
                                <Checkbox
                                  checked={Boolean(field.value)}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:ring-2 data-[state=checked]:ring-[#3b7cc9] transition"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="capitalize">{key.replace(/./, (c) => c.toUpperCase())} {key === 'alerts' ? 'alerts' : 'emails'}</FormLabel>
                                <FormDescription>
                                  {key === 'marketing'
                                    ? 'Receive emails about new products, features, and more.'
                                    : key === 'updates'
                                    ? 'Receive notifications about product updates and new features.'
                                    : 'Get notified when there are significant market movements.'}
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                      ))}
                    </CardContent>
                  </Card>

                  <div id="accessibility">
                    <Accessibility />
                  </div>

                  <CardFooter className="flex justify-end px-0">
                    <Button type="submit" className="bg-[#3b7cc9] text-white rounded-xl hover:bg-[#5591d1] transition-shadow shadow-md shadow-blue-500/10">
                      Save changes
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
