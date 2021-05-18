import { action, makeAutoObservable } from "mobx";

class UserStoreImpl {
  id = "";
  email = "email@email.com";
  password = "pass123";
  accType = "civilian";
  first_name = "";
  last_name = "";

  // token variables recieved after succesful login
  access_token = "";
  expires_in = "";
  roles = [];
  token_type = "";

  newDependant = "";
  dependants = ["Matt Goghurt", "Jake Cool"];
  certs = [
    { title: "Covid-19", status: "complete" },
    { title: "Tetanus", status: "pending" },
  ];
  infections = ["covid", "tetanus"];
  alerts = [];
  stats = [
    { key: "Australia", value: 138 },
    { key: "NSW", value: 74 },
    { key: "Shellharbour", value: 0 },
    { key: "totalImmunised", value: 600349 },
  ];

  // Healthcare worker user type
  isHealthCare = true;
  foundUser = { name: "Gregethy Knowles", id: "123456" };

  // Response from sign in
  isLoggedIn = false;
  errorMSG = "";
  isLoading = false;

  // URL address to qr img for both business and organisation
  QRCodeUrl =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/330px-QR_code_for_mobile_English_Wikipedia.svg.png";

  // Business Account
  businessName = "";

  // Organisation Account
  orgName = "";
  totalEmps = "77";
  emps = ["123", "125", "474", "221"]; // ID's of employees
  orgStats = [
    { key: "Acc's Registered", value: 64 },
    { key: "Vaccinated", value: 22 },
  ];

  // Check in Form
  checkedIn = false;
  scanned = false;

  constructor() {
    makeAutoObservable(this, {
      setProperty: action,
      resetState: action,
      addDependant: action,
      removeDependant: action,
      findUser: action,
      updateTotalEmps: action,
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

  findUser = (userId) => {
    console.log("searching for " + userId);
  };

  updateTotalEmps = () => {
    console.log("Updating DB with new total emp count");

    // Update database with this
    //this.orgStats[0].value;
  };

  addEmployee = (empId) => {
    console.log("Adding Employee " + empId + " to the organisation");
  };

  resetState = () => {
    this.id = "";
    this.email = "";
    this.password = "";
    this.accType = "";
    this.first_name = "";
    this.last_name = "";
    this.certs = [];
    this.infections = ["covid", "tetanus"];
    this.alerts = [];
    this.isHealthCare = false;
    this.errorMSG = "";
    this.businessName = "";
    //this.QRCodeUrl = "";
    this.orgName = "";
    this.employees = [];
  };

  doLogin = () => {

    fetch("http://localhost:5000/api/auth/sign_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.email,
        password: this.password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          this.errorMSG = "";
          this.access_token = json.access_token;
          this.expires_in = json.expires_in;
          this.roles = json.roles;
          this.token_type = json.token_type;
          this.isLoading = false;
          this.isLoggedIn = true;
        } else {
          this.errorMSG = json.message;
          this.isLoading = false;
        }
      });
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
    //this.isLoggedIn = true;

    if (!validateEmail(this.email)) {
      this.errorMSG = "Email format is incorrect";
      this.isLoading = false;
      return;
    }

    // Example fetch call below
    // {
      fetch("http://localhost:5000/api/auth/sign_up", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: this.accType,
          email: this.email,
          password: this.password,
          first_name: this.first_name,
          last_name: this.last_name,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          if (json.success) {
            this.resetState();
            this.errorMSG = "";
            this.isLoading = false;
          } else {
            this.errorMSG = json.message;
            this.isLoading = false;
          }
        });
    // }
  };
}

// Utility
const validateEmail = (email) => {
  let re = /\S+@\S/;
  return re.test(email);
};

export const UserStore = new UserStoreImpl();
