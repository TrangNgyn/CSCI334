import { action, makeAutoObservable, runInAction } from "mobx";

class UserStoreImpl {
  id = "";
  email = "";
  password = "";
  accType = "civ";
  firstName = "";
  lastName = "";
  certIDs = [];
  infections = ["covid", "tetanus"];
  alerts = [];

  // Healthcare worker user type
  isHealthCare = false;

  // Response from sign in
  isLoggedIn = false;
  errorMSG = "";

  // Business Account
  businessName = "";

  // Organisation Account
  orgName = "";
  employees = [];

  constructor() {
    makeAutoObservable(this, {
      setProperty: action,
      resetState: action,
    });
  }

  setProperty = (key, value) => {
    this[key] = value;
  };

  resetState = () => {
    this.id = "";
    this.id = "";
    this.email = "";
    this.password = "";
    this.accType = "";
    this.firstName = "";
    this.lastName = "";
    this.certIDs = [];
    this.infections = ["covid", "tetanus"];
    this.alerts = [];
    this.isHealthCare = false;
    this.errorMSG = "";
    this.businessName = "";
    this.orgName = "";
    this.employees = [];
  };

  doLogin = () => {
    this.isLoggedIn = true;

    // fetch("/api/account/signin", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: this.email,
    //     password: this.password,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((json) => {
    //     if (json.success) {
    //       this.errorMsg = "";
    //       this.isLoggedIn = true;
    //       this.isLoading = false;
    //       this.token = json.token;
    //       this.resetState();
    //     } else {
    //       this.errorMsg = json.message;
    //       this.isLoading = false;
    //     }
    //   });
  };

  doLogout = () => {
    this.isLoggedIn = false;
    this.resetState();

    // fetch("/api/account/logout", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   query: JSON.stringify({
    //     token: this.token,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((json) => {
    //     runInAction(() => {
    //       if (json.success) {
    //         this.resetState();
    //         this.isLoggedIn = false;
    //         this.token = "";
    //         this.isLoading = false;
    //       } else {
    //         this.isLoading = false;
    //       }
    //     });
    //   });
  };
}

// Utility
const validateEmail = (email) => {
  let re = /\S+@\S/;
  return re.test(email);
};

export const UserStore = new UserStoreImpl();
