import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { products, contacts, users, sessions } from "./shared/schema.js";
import { eq, lt } from "drizzle-orm";
import type { InsertProduct, InsertContact, User } from "./shared/schema.js";

// Configure Neon
neonConfig.fetchConnectionCache = true;

// Create a connection pool
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export const storage = {
  // Products
  async getProducts() {
    try {
      return await db.select().from(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  async getProduct(id: number) {
    try {
      const result = await db
        .select()
        .from(products)
        .where(eq(products.id, id));
      return result[0];
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  },

  async createProduct(data: InsertProduct) {
    try {
      const result = await db.insert(products).values(data).returning();
      return result[0];
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  async updateProduct(id: number, data: InsertProduct) {
    try {
      const result = await db
        .update(products)
        .set(data)
        .where(eq(products.id, id))
        .returning();
      return result[0];
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  },

  async deleteProduct(id: number) {
    try {
      await db.delete(products).where(eq(products.id, id));
      return true;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  },

  // Contacts
  async getContacts() {
    try {
      return await db.select().from(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      throw error;
    }
  },

  async createContact(data: InsertContact) {
    try {
      const result = await db.insert(contacts).values(data).returning();
      return result[0];
    } catch (error) {
      console.error("Error creating contact:", error);
      throw error;
    }
  },

  async deleteContact(id: number) {
    try {
      await db.delete(contacts).where(eq(contacts.id, id));
      return true;
    } catch (error) {
      console.error("Error deleting contact:", error);
      throw error;
    }
  },

  async archiveContact(id: number) {
    try {
      const result = await db
        .update(contacts)
        .set({ archived: true })
        .where(eq(contacts.id, id))
        .returning();
      return result[0];
    } catch (error) {
      console.error("Error archiving contact:", error);
      throw error;
    }
  },

  // Users
  async getUser(id: number) {
    try {
      const result = await db.select().from(users).where(eq(users.id, id));
      return result[0];
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },

  async getUserByUsername(username: string) {
    try {
      const result = await db
        .select()
        .from(users)
        .where(eq(users.username, username));
      return result[0];
    } catch (error) {
      console.error("Error fetching user by username:", error);
      throw error;
    }
  },

  async createUser(data: Omit<User, "id">) {
    try {
      const result = await db.insert(users).values(data).returning();
      return result[0];
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  // Sessions
  async getSession(id: string) {
    try {
      const result = await db
        .select()
        .from(sessions)
        .where(eq(sessions.id, id));
      return result[0];
    } catch (error) {
      console.error("Error fetching session:", error);
      throw error;
    }
  },

  async setSession(id: string, data: string, expires: Date) {
    try {
      await db
        .insert(sessions)
        .values({ id, data, expires })
        .onConflictDoUpdate({
          target: sessions.id,
          set: { data, expires },
        });
      return true;
    } catch (error) {
      console.error("Error setting session:", error);
      throw error;
    }
  },

  async destroySession(id: string) {
    try {
      await db.delete(sessions).where(eq(sessions.id, id));
      return true;
    } catch (error) {
      console.error("Error destroying session:", error);
      throw error;
    }
  },

  async clearExpiredSessions() {
    try {
      await db.delete(sessions).where(lt(sessions.expires, new Date()));
      return true;
    } catch (error) {
      console.error("Error clearing expired sessions:", error);
      throw error;
    }
  },
};
