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
  alerts = [
    {
      alertId: "alert123",
      location: "Primby Diner",
      businessId: "businessID123",
      timeStart: "1:45pm",
      timeFinish: "3:45pm",
      date: "23/04/2021",
      virus: "covid-19",
      active: true,
    },
    {
      alertId: "alert124",
      location: "Primby Hotel",
      businessId: "businessID124",
      timeStart: "7:45pm",
      timeFinish: "9:45pm",
      date: "13/04/2021",
      virus: "covid-19",
      active: true,
    },
  ];
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
  business_name = "";
  address = "";
  gps = {};
  place_id = "";

  // Organisation Account
  orgName = "";
  totalEmps = "77";
  emps = ["123", "125", "474", "221"]; // ID's of employees
  orgStats = [
    { key: "Acc's Registered", value: 64 },
    { key: "Vaccinated", value: 22 },
  ];

  // Admin Account
  verifiedOrganisations = [
    {
      name: "UoW",
      userId: "123141",
    },
    {
      name: "UNSW",
      userId: "121323",
    },
    {
      name: "UTS",
      userId: "121231",
    },
  ];
  pendingOrganisations = [
    {
      name: "UCal",
      userId: "233214",
    },
    {
      name: "USyd",
      userId: "234324",
    },
    {
      name: "UCLA",
      userId: "253212",
    },
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

  verifyOrganisation = (organisation) => {
    this.pendingOrganisations.splice(this.pendingOrganisations.indexOf(organisation), 1);
    this.verifiedOrganisations.push(organisation);
    // Update database
  };

  denyOrganisation = (organisation) => {
    this.pendingOrganisations.splice(this.pendingOrganisations.indexOf(organisation), 1);
    // Update database
  }

  deleteOrganisation = (organisation) => {
    this.verifiedOrganisations.splice(this.verifiedOrganisations.indexOf(organisation), 1);
    // Update database
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
    // this.isLoggedIn = true;
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
          console.log(json.roles);
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: this.accType,
        email: this.email,
        password: this.password,
        business_name: this.business_name,
        address: this.address,
        gps: this.gps,
        place_id: this.place_id,
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
