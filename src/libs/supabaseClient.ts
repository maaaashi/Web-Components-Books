import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sngegqaewbxlftdbxdme.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuZ2VncWFld2J4bGZ0ZGJ4ZG1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE1NDk0MTIsImV4cCI6MjAyNzEyNTQxMn0.gzV2PHh-kMfiIAamRB6utfpHafo2UrY7emEt6EiVJoY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
