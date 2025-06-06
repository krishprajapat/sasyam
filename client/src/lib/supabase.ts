import { apiRequest } from "./queryClient";
import { config } from '../config';

// Function to upload image to Supabase Storage
export async function uploadImage(file: File, bucket: string = 'products'): Promise<string> {
  if (!file) {
    throw new Error('No file provided');
  }

  // Create a multipart form data
  const formData = new FormData();
  formData.append('file', file);
  formData.append('bucket', bucket);

  try {
    // Upload file to Supabase via our API endpoint
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to upload image');
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

// Authentication functions
export async function login(username: string, password: string) {
  const response = await fetch(`${config.apiBaseUrl}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
}

export async function logout() {
  const response = await fetch(`${config.apiBaseUrl}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }

  return response.json();
}

export async function getCurrentUser() {
  try {
    const response = await fetch(`${config.apiBaseUrl}/api/auth/user`, {
      credentials: 'include'
    });
    return await response.json();
  } catch (error) {
    console.error('Error getting current user:', error);
    return { authenticated: false };
  }
}