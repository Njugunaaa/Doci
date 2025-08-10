import { users, doctors, communities, type User, type InsertUser, type Doctor, type InsertDoctor, type Community, type InsertCommunity } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined>;
  
  // Doctor methods
  getDoctor(userId: number): Promise<Doctor | undefined>;
  createDoctor(doctor: InsertDoctor): Promise<Doctor>;
  
  // Community methods
  getCommunities(): Promise<Community[]>;
  getCommunity(id: number): Promise<Community | undefined>;
  createCommunity(community: InsertCommunity): Promise<Community>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async getDoctor(userId: number): Promise<Doctor | undefined> {
    const [doctor] = await db.select().from(doctors).where(eq(doctors.id, userId));
    return doctor || undefined;
  }

  async createDoctor(doctor: InsertDoctor): Promise<Doctor> {
    const [newDoctor] = await db
      .insert(doctors)
      .values(doctor)
      .returning();
    return newDoctor;
  }

  async getCommunities(): Promise<Community[]> {
    return await db.select().from(communities);
  }

  async getCommunity(id: number): Promise<Community | undefined> {
    const [community] = await db.select().from(communities).where(eq(communities.id, id));
    return community || undefined;
  }

  async createCommunity(community: InsertCommunity): Promise<Community> {
    const [newCommunity] = await db
      .insert(communities)
      .values(community)
      .returning();
    return newCommunity;
  }
}

export const storage = new DatabaseStorage();
