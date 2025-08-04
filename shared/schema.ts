import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const medicationScans = pgTable("medication_scans", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  imageUrl: text("image_url"),
  analysisResult: jsonb("analysis_result"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertMedicationScanSchema = createInsertSchema(medicationScans).pick({
  userId: true,
  imageUrl: true,
  analysisResult: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type MedicationScan = typeof medicationScans.$inferSelect;
export type InsertMedicationScan = z.infer<typeof insertMedicationScanSchema>;

export interface MedicationAnalysis {
  brandName: string;
  genericName: string;
  strength: string;
  form: string;
  activeIngredients: {
    name: string;
    amount: string;
    description: string;
    purposes: string[];
  }[];
  commonUses: string[];
  safetyInfo: string[];
  identified: boolean;
  confidence: number;
}
