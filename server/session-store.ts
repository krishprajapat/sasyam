import { Store } from "express-session";
import { storage } from "./storage.js";

export class DatabaseStore extends Store {
  async get(sid: string, callback: (err: any, session?: any) => void) {
    try {
      const session = await storage.getSession(sid);
      if (!session) {
        return callback(null, null);
      }
      callback(null, JSON.parse(session.data));
    } catch (err) {
      callback(err);
    }
  }

  async set(sid: string, session: any, callback: (err?: any) => void) {
    try {
      const expires =
        session.cookie?.expires || new Date(Date.now() + 24 * 60 * 60 * 1000);
      await storage.setSession(sid, JSON.stringify(session), expires);
      callback();
    } catch (err) {
      callback(err);
    }
  }

  async destroy(sid: string, callback: (err?: any) => void) {
    try {
      await storage.destroySession(sid);
      callback();
    } catch (err) {
      callback(err);
    }
  }

  async clear(callback: (err?: any) => void) {
    try {
      await storage.clearExpiredSessions();
      callback();
    } catch (err) {
      callback(err);
    }
  }
}
