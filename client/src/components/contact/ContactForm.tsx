import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { AnimatedContainer } from '@/components/ui/animated-container';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  subject: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: FormValues) => {
      const res = await apiRequest('POST', '/api/contacts', values);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon.",
        variant: "default",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: FormValues) {
    mutate(values);
  }

  return (
    <AnimatedContainer type="fade">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-neutral-dark">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-neutral-lightest border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-neutral-dark">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your email"
                      className="w-full px-4 py-3 bg-neutral-lightest border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-neutral-dark">Subject</FormLabel>
                <FormControl>
                  <Input
                    placeholder="What is this regarding?"
                    className="w-full px-4 py-3 bg-neutral-lightest border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-neutral-dark">Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 bg-neutral-lightest border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[150px]"
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit"
            className="btn-primary w-full md:w-auto"
            disabled={isPending}
          >
            {isPending ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </Form>
    </AnimatedContainer>
  );
}
