import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Archive, Trash2 } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';

interface Contact {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  archived: boolean;
  createdAt: string;
}

interface ContactListProps {
  limit?: number;
  showArchived?: boolean;
}

export default function ContactList({ limit, showArchived = false }: ContactListProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [contactToDelete, setContactToDelete] = useState<number | null>(null);
  
  const { data: contacts = [], isLoading } = useQuery<Contact[]>({
    queryKey: ['/api/contacts'],
  });

  // Archive contact mutation
  const archiveMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest('PATCH', `/api/contacts/${id}/archive`, {});
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
      toast({
        title: 'Contact archived',
        description: 'The contact has been archived successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Failed to archive contact',
        description: error.message || 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    },
  });

  // Delete contact mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest('DELETE', `/api/contacts/${id}`, {});
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
      toast({
        title: 'Contact deleted',
        description: 'The contact has been deleted successfully.',
      });
      setContactToDelete(null);
    },
    onError: (error) => {
      toast({
        title: 'Failed to delete contact',
        description: error.message || 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    },
  });

  // Filter contacts based on archived status
  const filteredContacts = contacts.filter((contact: any) => contact.archived === showArchived);
  
  // Apply limit if provided
  const displayedContacts = limit ? filteredContacts.slice(0, limit) : filteredContacts;

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse bg-gray-100 p-4 rounded-md">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (displayedContacts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          {showArchived 
            ? 'No archived messages found.' 
            : 'No new messages at the moment.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {displayedContacts.map((contact: any) => (
        <div key={contact.id} className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium">{contact.name}</h3>
              <p className="text-sm text-gray-500">{contact.email}</p>
            </div>
            <div className="flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => archiveMutation.mutate(contact.id)}
                      disabled={archiveMutation.isPending}
                    >
                      <Archive className="h-4 w-4 text-gray-500" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Archive message</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <AlertDialog open={contactToDelete === contact.id} onOpenChange={(open) => !open && setContactToDelete(null)}>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setContactToDelete(contact.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the message from {contact.name}.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-500 hover:bg-red-600"
                      onClick={() => deleteMutation.mutate(contact.id)}
                      disabled={deleteMutation.isPending}
                    >
                      {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          
          {contact.subject && (
            <p className="text-sm font-medium mb-1">Subject: {contact.subject}</p>
          )}
          
          <p className="text-sm mb-2">{contact.message}</p>
          
          <p className="text-xs text-gray-400">
            {formatDate(contact.createdAt)}
          </p>
        </div>
      ))}
    </div>
  );
}
