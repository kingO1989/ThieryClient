import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://zeirbygcksccswtvbzeo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplaXJieWdja3NjY3N3dHZiemVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY2Njk4NzcsImV4cCI6MjAyMjI0NTg3N30.Ac5p5iTRZzwGwxZt4RVYMU75I5ANWySCYB0iEQQ7rdI"
);

export default supabase;
