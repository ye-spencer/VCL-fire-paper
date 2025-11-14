import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const dataTable = pgTable('datatable', {
    id: serial("id").primaryKey(),
    date: text("date").notNull(),
    trial_time: integer("trial_time").notNull(),
    value: integer("value").notNull(),
    x: integer("x").notNull(),
    y: integer("y").notNull(), 
    word_one: text("word_one").notNull(),
    word_two: text("word_two").notNull(),
    trial_number: integer("trial_number").notNull(),
    chunk_number: integer("chunk_number").notNull(),
    prolific_id: text("prolific_id").notNull(),
    study_id: text("study_id").notNull(),
    session_id: text("session_id").notNull()
});