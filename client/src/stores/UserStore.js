import { action, makeAutoObservable } from "mobx";
import QRCode from 'qrcode';

const hash = require('hash.js');

class UserStoreImpl {
  id = "";
  email = "someemail@email.com";
  password = "somePass12@3";
  accType = "civilian";
  first_name = "";
  last_name = "";

  // token variables recieved after succesful login
  access_token = "";
  expires_in = "";
  roles = [];
  token_type = "";

  newDependant = "";
  dependants = [];
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
  isHealthCare = false;
  foundUser = { name: "Gregethy Knowles", id: "123456" };

  // Response from sign in
  isLoggedIn = false;
  errorMSG = "";
  isLoading = false;

  // Business Account
  business_document_id = "";
  business_name = "";
  business_id = "";
  qr_code = "";
  address = "";
  gps = {};
  place_id = "";
  
  // active cases by timestamp, postcode and area e.g. Sydney, Northern Sydney, Wollongong etc.
  activeCasesStats = [];
  allAusData = []; // numerous australia-wide covid-19 related statistics
  total_vaccinations = [];
  ausData14Days = []; // all of Australia data over the last 14 days
  esri_data = [];
  esri_current_totals = [];

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
      getBusiness: action,
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

  getActiveCases = () => {
    fetch("http://localhost:5000/api/stats/confirmed-cases-14days", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.access_token}`
      }
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          this.errorMSG = "";
          this.activeCasesStats = json.confirmed_cases;
          this.isLoading = false;
        } else {
          this.errorMSG = json.message;
          this.isLoading = false;
        }
      });
  };

  getAusData = () => {
    fetch("http://localhost:5000/api/stats/get-aus-data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.access_token}`
      }
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          this.errorMSG = "";
          this.allAusData = json.aus_data;
          this.isLoading = false;
        } else {
          this.errorMSG = json.message;
          this.isLoading = false;
        }
      });
  };

  getAusData14Days = () => {
    fetch("http://localhost:5000/api/stats/get-aus-confirmed-cases-14days", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.access_token}`
      }
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.success) {
          this.errorMSG = "";
          this.ausData14Days = json.aus_14days;
          this.isLoading = false;
        } else {
          this.errorMSG = json.message;
          this.isLoading = false;
        }
      });
  }

  getEsriData = () => {
    fetch("http://localhost:5000/api/stats/get-esri-data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.access_token}`
      }
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.success) {
          this.errorMSG = "";
          this.esri_data = json.esri_data;
          this.isLoading = false;
        } else {
          this.errorMSG = json.message;
          this.isLoading = false;
        }
      });
  }
  
  getCurrentTotals= () => {
    fetch("http://localhost:5000/api/stats/get-current-totals-data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.access_token}`
      }
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.success) {
          this.errorMSG = "";
          this.esri_current_totals = json.esri_data;
          this.isLoading = false;
        } else {
          this.errorMSG = json.message;
          this.isLoading = false;
        }
      });
  }

  getTotalVaccinations = () => {
    fetch("http://localhost:5000/api/stats/get-aus-total-vaccinations", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.access_token}`
      }
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          this.errorMSG = "";
          this.total_vaccinations = json.total_vaccinations;
          this.isLoading = false;
        } else {
          this.errorMSG = json.message;
          this.isLoading = false;
        }
      });
  };

  // get business by id for check in
  getBusiness = () => {
    fetch("http://localhost:5000/api/business/get_business", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        business_id: this.business_id.text,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          this.errorMSG = "";
          this.business_document_id = json.found._id; // get mongoDB object id of document
          this.business_name = json.found.business_name; // get name of business
          this.address = json.found.address; // get human-readable address of business
          this.gps = json.found.gps; // get coordinates of business
          this.isLoading = false;
        } else {
          this.errorMSG = json.message;
          this.isLoading = false;
        }
      });
  };

  doCheckIn = () => {
    fetch("http://localhost:5000/api/check-in/create-check-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.access_token}`
      },
      body: JSON.stringify({
        business: this.business_document_id,
        dependant: this.dependants,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.success) {
          this.errorMSG = "";
          this.isLoading = false;
          this.checkedIn = true;
        } else {
          this.errorMSG = json.message;
          this.isLoading = false;
        }
      });
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
        console.log(json);
        if (json.success) {
          this.errorMSG = "";
          this.access_token = json.access_token; // store authentication/access token for allowing to stay signed in for a certain amount of time
          this.expires_in = json.expires_in; // store time in seconds before token expires
          this.roles = json.roles; // get a users roles, e.g. civilian, business etc.
          this.token_type = json.token_type;

          this.business_name = json.business_name; 
          this.address = json.address;
          this.qr_code = json.qr_cde;

          this.isHealthCare = json.is_healthcare_worker;
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

    // QRCode.toDataURL(businessID)
    // .then(url => {
    //   console.log(url)
    // })
    // .catch(err => {
    //   console.error(err)
    // })

    const generateQR = async (business_id) => {
      try {
        const qr_code_url = await QRCode.toDataURL(business_id);
          signUpCallback(qr_code_url, business_id);
      } catch (err) {
        console.error(err)
      }
    }
    
    // method used for user sign up
    const signUp = () => {
      fetch("http://localhost:5000/api/auth/sign_up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        if (json.success) {
          this.resetState();
          this.errorMSG = "";
          this.isLoading = false;
        } else {
          this.errorMSG = json.message;
          this.isLoading = false;
        }
      });
    }

    // if signing up for a business account generate qr code then run business sign up method, else run user sign up method
    if(this.accType === 'business') {
      const businessID = hash.sha256().update(this.email).digest('hex'); // email is hashed to provide a unique identifier for a qr code without revealing a business' email
      generateQR(businessID);
    } else { 
      signUp();
    }

    // method used for user business sign up
    const signUpCallback = (qr_code_url, business_id) => {
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
          business_id: business_id,
          qr_code: qr_code_url,
          address: this.address,
          gps: this.gps,
          place_id: this.place_id,
        }),
      })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          this.resetState();
          this.errorMSG = "";
          this.isLoading = false;
        } else {
          this.errorMSG = json.message;
          this.isLoading = false;
        }
      });
    }

  };
  
}

// Utility
const validateEmail = (email) => {
  let re = /\S+@\S/;
  return re.test(email);
};

export const UserStore = new UserStoreImpl();
