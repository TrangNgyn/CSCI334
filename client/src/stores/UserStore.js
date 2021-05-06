import { action, makeAutoObservable } from "mobx";

class UserStoreImpl {
  id = "";
  email = "email@email.com";
  password = "pass123";
  accType = "civ";
  firstName = "";
  lastName = "";
  newDependant = "";
  dependants = ["Matt Goghurt", "Jake Cool"];
  certIDs = [];
  infections = ["covid", "tetanus"];
  alerts = [];

  // Healthcare worker user type
  isHealthCare = false;

  // Response from sign in
  isLoggedIn = false;
  errorMSG = "";
  isLoading = false;

  // Business Account
  businessName = "";

  // Organisation Account
  orgName = "";
  employees = [];

  // Check in Form
  checkedIn = false;
  scanned = false;

  constructor() {
    makeAutoObservable(this, {
      setProperty: action,
      resetState: action,
      addDependant: action,
      removeDependant: action,
    });
  }

  setProperty = (key, value) => {
    this[key] = value;
  };

  addDependant = () => {
    if (this.newDependant !== "") {
      if (!this.dependants.includes(this.newDependant)) {
        this.dependants.push(this.newDependant);
        this.newDependant = "";
      }
    }
  };

  removeDependant = (name) => {
    this.dependants = this.dependants.filter((dep) => dep !== name.name);
  };

  resetState = () => {
    this.id = "";
    this.email = "";
    this.password = "";
    this.accType = "civ";
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

  doSignUp = () => {
    //this.isLoading = true;
    this.isLoggedIn = true;

    if (!validateEmail(this.email)) {
      this.errorMsg = "Email format is incorrect";
      this.isLoading = false;
      return;
    }

    // fetch('/api/account/createaccount', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     accType: this.accType,
    //     email: this.email,
    //     password: this.password,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((json) => {
    //     if (json.success) {
    //       this.resetState();
    //       this.errorMsg = json.message;
    //       this.isLoading = false;
    //     } else {
    //       this.errorMsg = json.message;
    //       this.isLoading = false;
    //     }
    //   });
  };
}

// Utility
const validateEmail = (email) => {
  let re = /\S+@\S/;
  return re.test(email);
};

export const UserStore = new UserStoreImpl();
