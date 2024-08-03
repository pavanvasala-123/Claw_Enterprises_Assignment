const dotenv = require('dotenv');
dotenv.config()

const supabase = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const registerUser = async (name , email, password) => {
  const { user, error } = await supabaseClient.auth.signUp({name, email, password });
  if (error) throw error;
  return user;
};

const loginUser = async (email, password) => {
  const { user, error } = await supabaseClient.auth.signIn({ email, password });
  if (error) throw error;
  return user;
};

module.exports = { registerUser, loginUser };
