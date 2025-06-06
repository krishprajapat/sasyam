import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useState, useRef, useCallback } from 'react';
import { handleImageError } from '@/lib/utils';
import { Image, Upload } from 'lucide-react';
import { uploadImage } from '@/lib/supabase';

// Product form schema
const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  imageUrl: z.string().optional(),
  price: z.string().min(1, 'Price is required'),
  quantity: z.number().min(0, 'Quantity must be 0 or greater'),
  unit: z.string().min(1, 'Unit is required'),
  inStock: z.boolean().default(true),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  product?: {
    id?: number;
    name: string;
    description: string;
    category: string;
    imageUrl?: string;
    price: string;
    quantity: number;
    unit: string;
    inStock: boolean | null;
  };
  onSuccess?: () => void;
}

const categories = ['Dairy', 'Personal Care', 'Panchagavya'];
const units = ['grams', 'ml', 'pieces', 'packets', 'kg', 'liters'];

export function ProductForm({ product, onSuccess }: ProductFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditMode = !!product;
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      category: product?.category || '',
      imageUrl: product?.imageUrl || '',
      price: product?.price || '',
      quantity: product?.quantity || 0,
      unit: product?.unit || '',
      inStock: product?.inStock ?? true,
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: ProductFormValues) => {
      if (isEditMode) {
        const res = await apiRequest('PUT', `/api/products/${product.id}`, values);
        return res.json();
      } else {
        const res = await apiRequest('POST', '/api/products', values);
        return res.json();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      
      toast({
        title: isEditMode ? 'Product updated' : 'Product created',
        description: isEditMode 
          ? 'The product has been updated successfully.' 
          : 'The product has been created successfully.',
      });
      
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      toast({
        title: isEditMode ? 'Failed to update product' : 'Failed to create product',
        description: error.message || 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const imageUrl = await uploadImage(file);
      form.setValue('imageUrl', imageUrl);
      toast({
        title: 'Image uploaded',
        description: 'The image has been uploaded successfully.',
      });
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: error instanceof Error ? error.message : 'Failed to upload image',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  }, [form, toast]);

  const onSubmit = useCallback((values: ProductFormValues) => {
    mutation.mutate(values);
  }, [mutation]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6">
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-[200px]">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (₹)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-[200px]">
              <FormField
                control={form.control}
                name="inStock"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">In Stock</FormLabel>
                      <FormDescription>
                        Mark if the product is available
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="Enter quantity"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-[200px]">
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {units.map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Unit of measurement for the quantity
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Image</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <div 
                        className="relative h-40 w-40 rounded-lg border border-dashed flex items-center justify-center cursor-pointer overflow-hidden"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {field.value ? (
                          <img
                            src={field.value}
                            alt="Product"
                            className="h-full w-full object-cover"
                            onError={handleImageError}
                          />
                        ) : (
                          <div className="text-center">
                            <Upload className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-500">Click to upload</p>
                          </div>
                        )}
                        {isUploading && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="text-white">Uploading...</div>
                          </div>
                        )}
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <Input type="hidden" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Upload a product image. Maximum size: 5MB
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the product's benefits, ingredients, and usage..." 
                      className="min-h-[300px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={mutation.isPending || isUploading}
          >
            {mutation.isPending ? 'Please wait...' : (isEditMode ? 'Update Product' : 'Create Product')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
