import { supabase } from "../supabase";
import { writable } from "svelte/store";
import { null_to_empty } from "svelte/internal";

export const userStore = writable(supabase.auth.user());

// user.set(() => supabase.auth.user());

export const signupUser = async (formData) => {
    let res = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password
    });
    if (res.error) {
      console.error(res.error);
    }
    console.log('user signup results:', res);
    userStore.set(res.user);
    return res;
  }
  export const loginUser = async (formData) => {	  
    let res = await supabase.auth.signIn({
      email: formData.email,
      password: formData.password
    });
    if (res.error) {
      console.error(res.error);
    }
    console.log('user login results:', res);
    userStore.set(res.user);
    return res;
}

export const logout = async () => {
  let { error } = await supabase.auth.signOut();
  if (error) console.error(error);
  userStore.set(null);
}
