import { writable } from "svelte/store";

export const customerStore = writable(null);
export const cartStore = writable(null);

export const logOutCustomer = async (customer) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  let raw = JSON.stringify({
      "email": customer.email,
      "password": customer.password
  });
    
  let requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
      credentials: 'include'
  };
    
  return await fetch("https://medusa-store-420.herokuapp.com/store/auth", requestOptions)
  .then(response => response.text())
  .then(result => {
    customerStore.set(null);
    cartStore.set(null);
    return customer;
  })
  .catch(error => console.error('error:', error));
}

export const loginCustomer = async (formData) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  let raw = JSON.stringify({
      "email": formData.email,
      "password": formData.password
  });
    
  let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
      credentials: 'include'
  };
    
  return await fetch("https://medusa-store-420.herokuapp.com/store/auth", requestOptions)
  .then(response => response.text())
  .then(result => {
    const { customer } = JSON.parse(result)
    customerStore.set(customer);
    console.log(customer)
    return customer;
  })
  .catch(error => console.error('error:', error));
}

export const signUpCustomer = async (formData) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    "email": formData.email,
    "password": formData.password,
    "first_name": formData.fName,
    "last_name": formData.lName
  });

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
    credentials: 'same-origin'
  };

  fetch("https://medusa-store-420.herokuapp.com/store/customers", requestOptions)
  .then(response => response.text())
  .then(result => {
    const { customer } = JSON.parse(result);
    customer ? customerStore.set(customer) & console.log(result) 
    : console.log("error:", result);
    return customer;
  })
  .catch(error => console.error('error:', error));
}

export const getCart = async (cart) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    "region_id": "reg_01FWF3A6GQKYWC6P26E3JPMXHR"
  });

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
    credentials: 'include'
  };

  console.log(cart);
  if (!cart) {
    return await fetch("https://medusa-store-420.herokuapp.com/store/carts", requestOptions)
    .then(response => response.text())
    .then(result => {
      const { cart } = JSON.parse(result);
      console.log(cart)
      cartStore.set(cart)
      return cartStore;
    })
    .catch(error => console.log('error', error));
  } else {
    return cart;
  }
}

export const getCustomer = async () => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    // body: raw,
    redirect: 'follow',
    credentials: 'include'
  };

  return await fetch("https://medusa-store-420.herokuapp.com/store/customers/me", requestOptions)
    .then(response => response.text())
    .then(result => {
      const { customer } = JSON.parse(result);
      console.log(customer);
      customer ? customerStore.set(customer) : null;
      return customer;
    })
    .catch(error => console.log('error', error));
}