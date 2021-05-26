import { action, makeAutoObservable, runInAction } from "mobx";
import QRCode from "qrcode";

const hash = require("hash.js");

class UserStoreImpl {
  id = "";
  email = "Tiffany-April@gmail.com";
  password = "555555";
  accType = "civilian";
  first_name = "";
  last_name = "";
  vaccination_certificate = {};
  alerts = [
    // {
    //   alertId: "alert124",
    //   location: "Primby Hotel",
    //   businessId: "businessID124",
    //   timeStart: "7:45pm",
    //   timeFinish: "9:45pm",
    //   date: "13/04/2021",
    //   virus: "covid-19",
    //   active: true,
    // },
  ];

  // token variables recieved after succesful login
  access_token = "";
  expires_in = "";
  roles = [];
  token_type = "";

  newDependant = "";
  dependants = [];
  infections = ["covid"];

  // Healthcare worker user type
  isHealthCare = false;
  foundUser = { first_name: "", last_name: "", email: "", vaccine_status: {} };
  operationWasSuccessful = false;

  // Response from sign in/sign up
  isLoggedIn = false;
  errorMSG = "";
  successMSG = "";
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
  vic_recent_confirmed_cases = [];
  vic_vaccine_locations = [];

  // Organisation Account
  organisation_name = "";
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

  // admin account approve and revoke organisation account status
  updateOrganisationVerification = (email, verified) => {
    runInAction(() => {
      this.operationWasSuccessful = false;
      this.errorMSG = "";
      this.successMSG = "";
      this.isLoading = true;
    });
    fetch("http://localhost:5000/api/organisation/update-org-status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.access_token}`
      },
      body: JSON.stringify({
        email: email,
        is_verified: verified,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        runInAction(() => {
          if (json.success) {
            this.errorMSG = "";
            this.successMSG = json.message;
            this.operationWasSuccessful = true;
            this.isLoading = false;
          } else {
            this.errorMSG = json.message;
            this.successMSG = "";
            this.operationWasSuccessful = false;
            this.isLoading = false;
          }
        });
      })
      .catch((err) => {
        runInAction(() => {
          this.errorMSG = err;
          this.successMSG = "";
          this.operationWasSuccessful = false;
          this.isLoading = false;
        });
      });
  };

  addEmployee = (userEmail) => {
    runInAction(() => {
      this.operationWasSuccessful = false;
      this.isLoading = true;
    });
    fetch("http://localhost:5000/api/civilian/promote-civilian", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.access_token}`,
      },
      body: JSON.stringify({
        email: userEmail,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        runInAction(() => {
          if (json.success) {
            this.errorMSG = "";
            this.successMSG =
              "Succesfully added user to Organisation and granted Healthcare Worker privileges!";
            this.operationWasSuccessful = true;
            this.isLoading = false;
          } else {
            this.errorMSG = json.message;
            this.successMSG = "";
            this.operationWasSuccessful = false;
            this.isLoading = false;
          }
        });
      })
      .catch((err) => {
        runInAction(() => {
          this.errorMSG = err;
          this.successMSG = "";
          this.operationWasSuccessful = false;
          this.isLoading = false;
        });
      });
  };

  removeEmployee = (userEmail) => {
    runInAction(() => {
      this.operationWasSuccessful = false;
      this.isLoading = true;
    });
    fetch("http://localhost:5000/api/civilian/demote-healthcare", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.access_token}`,
      },
      body: JSON.stringify({
        email: userEmail,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        runInAction(() => {
          if (json.success) {
            this.errorMSG = "";
            this.successMSG =
              "Succesfully removed employee from your Organisation and revoked their Healthcare Worker privileges!";
            this.operationWasSuccessful = true;
            this.isLoading = false;
          } else {
            this.errorMSG = json.message;
            this.successMSG = "";
            this.operationWasSuccessful = false;
            this.isLoading = false;
          }
        });
      })
      .catch((err) => {
        runInAction(() => {
          this.errorMSG = err;
          this.successMSG = "";
          this.operationWasSuccessful = false;
          this.isLoading = false;
        });
      });
  };

  verifyOrganisation = (organisation) => {
    this.pendingOrganisations.splice(
      this.pendingOrganisations.indexOf(organisation),
      1
    );
    this.verifiedOrganisations.push(organisation);
    // Update database
  };

  denyOrganisation = (organisation) => {
    this.pendingOrganisations.splice(
      this.pendingOrganisations.indexOf(organisation),
      1
    );
    // Update database
  };

  deleteOrganisation = (organisation) => {
    this.verifiedOrganisations.splice(
      this.verifiedOrganisations.indexOf(organisation),
      1
    );
    // Update database
  };

  resetState = () => {
    this.id = "";
    this.email = "";
    this.password = "";
    this.accType = "civilian";
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

  adminPopulateOrgList = (setVerifiedOrgList, setUnverifiedOrgList) => {
    runInAction(() => {
      this.isLoading = true;
      this.operationWasSuccessful = false;
      this.errorMSG = "";
    });
    fetch("http://localhost:5000/api/organisation/get-org-by-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.access_token}`,
      },
      // body: JSON.stringify({
      //   is_verified: userEmail,
      // }),
    })
      .then((res) => res.json())
      .then((json) => {
        runInAction(() => {
          if (json.success) {
            this.errorMSG = "";
            setVerifiedOrgList(json.data.verified_org);
            setUnverifiedOrgList(json.data.unverified_org);
            this.operationWasSuccessful = true;
            this.isLoading = false;
          } else {
            this.errorMSG = json.message;
            this.operationWasSuccessful = false;
            this.isLoading = false;
          }
        });
      })
      .catch((err) => {
        runInAction(() => {
          this.errorMSG = err;
          this.operationWasSuccessful = false;
          this.isLoading = false;
        });
      });
  };

  healthCareSearchUser = (userEmail) => {
    runInAction(() => {
      this.isLoading = true;
      this.operationWasSuccessful = false;
      this.errorMSG = "";
    });
    fetch("http://localhost:5000/api/civilian/healthcare-search-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.access_token}`,
      },
      body: JSON.stringify({
        email: userEmail,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        runInAction(() => {
          if (json.success) {
            this.errorMSG = "";
            this.foundUser = json.civilian;
            this.operationWasSuccessful = true;
            this.isLoading = false;
          } else {
            this.errorMSG = json.message;
            this.operationWasSuccessful = false;
            this.isLoading = false;
          }
        });
      })
      .catch((err) => {
        runInAction(() => {
          this.errorMSG = err;
          this.operationWasSuccessful = false;
          this.isLoading = false;
        });
      });
  };

  healthCareGetVaccineStatus = () => {
    runInAction(() => {
      this.isLoading = true;
      this.errorMSG = "";
    });
    fetch("http://localhost:5000/api/civilian/retrieve-vaccination-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.access_token}`,
      },
      body: JSON.stringify({
        email: this.foundUser.email,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        runInAction(() => {
          if (json.success) {
            this.errorMSG = "";
            this.foundUser.vaccine_status = json.data.vaccine;
            console.log(json.data.vaccine);
            console.log(this.foundUser.vaccine_status);
            this.isLoading = false;
          } else {
            this.errorMSG = json.message;
            this.isLoading = false;
          }
        });
      })
      .catch((err) => {
        runInAction(() => {
          this.errorMSG = err;
          this.isLoading = false;
        });
      });
  };

  // as a healthcare worker, update a vaccination status of a civilian
  healthCareUpdateVaccinationStatus = (
    vaccine_type,
    date,
    recommended_doses,
    doses_received,
    setSuccessMSG
  ) => {
    runInAction(() => {
      this.isLoading = true;
      this.errorMSG = "";
      this.successMSG = "";
    });
    fetch("http://localhost:5000/api/civilian/update-vaccination-status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.access_token}`,
      },
      body: JSON.stringify({
        email: this.foundUser.email,
        vaccine_type,
        date,
        recommended_doses,
        doses_received,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        runInAction(() => {
          if (json.success) {
            this.errorMSG = "";
            this.successMSG = "Succesfully updated users' vaccination status!";
            setSuccessMSG(json.message);
            this.isLoading = false;
          } else {
            this.errorMSG = json.message;
            this.successMSG = "";
            this.isLoading = false;
          }
        });
      })
      .catch((err) => {
        runInAction(() => {
          this.errorMSG = err;
          this.successMSG = "";
          this.isLoading = false;
        });
      });
  };

  getActiveCases = () => {
    runInAction(() => {
      this.isLoading = true;
      this.errorMSG = "";
    });
    fetch("http://localhost:5000/api/stats/confirmed-cases-14days", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        runInAction(() => {
          if (json.success) {
            this.errorMSG = "";
            this.activeCasesStats = json.confirmed_cases;
            this.isLoading = false;
          } else {
            this.errorMSG = json.message;
            this.isLoading = false;
          }
        });
      })
      .catch((err) => {
        runInAction(() => {
          this.errorMSG = err;
          this.isLoading = false;
        });
      });
  };

  // get vaccine locations for Victoria (only state to release a dataset with vaccine locations)
  getVaccineLocations = () => {
    runInAction(() => {
      this.isLoading = true;
      this.errorMSG = "";
    });
    fetch("http://localhost:5000/api/stats/get-vic-vaccine-locations", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        runInAction(() => {
          if (json.success) {
            this.errorMSG = "";
            this.vic_vaccine_locations = json.vaccine_locations;
            this.isLoading = false;
          } else {
            this.errorMSG = json.message;
            this.isLoading = false;
          }
        });
      })
      .catch((err) => {
        runInAction(() => {
          this.errorMSG = err;
          this.isLoading = false;
        });
      });
  };

  getAusData = () => {
    runInAction(() => {
      this.isLoading = true;
      this.errorMSG = "";
    });
    fetch("http://localhost:5000/api/stats/get-aus-data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        runInAction(() => {
          if (json.success) {
            this.errorMSG = "";
            this.allAusData = json.aus_data;
            this.isLoading = false;
          } else {
            this.errorMSG = json.message;
            this.isLoading = false;
          }
        });
      })
      .catch((err) => {
        runInAction(() => {
          this.errorMSG = err;
          this.isLoading = false;
        });
      });
  };

  getAusData14Days = () => {
    runInAction(() => {
      this.isLoading = true;
      this.errorMSG = "";
    });
    fetch("http://localhost:5000/api/stats/get-aus-confirmed-cases-14days", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        runInAction(() => {
          if (json.success) {
            this.errorMSG = "";
            this.ausData14Days = json.aus_14days;
            this.isLoading = false;
          } else {
            this.errorMSG = json.message;
            this.isLoading = false;
          }
        });
      })
      .catch((err) => {
        runInAction(() => {
          this.errorMSG = err;
          this.isLoading = false;
        });
      });
  };

  getEsriData = () => {
    runInAction(() => {
      this.isLoading = true;
      this.errorMSG = "";
    });
    fetch("http://localhost:5000/api/stats/get-esri-data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        runInAction(() => {
          if (json.success) {
            this.errorMSG = "";
            this.esri_data = json.esri_data;
            this.isLoading = false;
          } else {
            this.errorMSG = json.message;
            this.isLoading = false;
          }
        });
      })
      .catch((err) => {
        runInAction(() => {
          this.errorMSG = err;
          this.isLoading = false;
        });
      });
  };

  getRecentVicCases = () => {
    runInAction(() => {
      this.isLoading = true;
      this.errorMSG = "";
    });
    fetch("http://localhost:5000/api/stats/get-vic-confirmed-cases-14days", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        runInAction(() => {
          if (json.success) {
            this.errorMSG = "";
            this.vic_recent_confirmed_cases = json.confirmed_cases;
            this.isLoading = false;
          } else {
            this.errorMSG = json.message;
            this.isLoading = false;
          }
        });
      })
      .catch((err) => {
        runInAction(() => {
          this.errorMSG = err;
          this.isLoading = false;
        });
      });
  };

  getCurrentTotals = () => {
    runInAction(() => {
      this.isLoading = true;
      this.errorMSG = "";
    });
    fetch("http://localhost:5000/api/stats/get-current-totals-data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        runInAction(() => {
          if (json.success) {
            this.errorMSG = "";
            this.esri_current_totals = json.esri_data;
            this.isLoading = false;
          } else {
            this.errorMSG = json.message;
            this.isLoading = false;
          }
        });
      })
      .catch((err) => {
        runInAction(() => {
          this.errorMSG = err;
          this.isLoading = false;
        });
      });
  };

  getTotalVaccinations = () => {
    runInAction(() => {
      this.isLoading = true;
      this.errorMSG = "";
    });
    fetch("http://localhost:5000/api/stats/get-aus-total-vaccinations", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        runInAction(() => {
          if (json.success) {
            this.errorMSG = "";
            this.total_vaccinations = json.total_vaccinations;
            this.isLoading = false;
          } else {
            this.errorMSG = json.message;
            this.isLoading = false;
          }
        });
      })
      .catch((err) => {
        runInAction(() => {
          this.errorMSG = err;
          this.isLoading = false;
        });
      });
  };

  // get business by id for check in
  getBusiness = () => {
    runInAction(() => {
      this.isLoading = true;
      this.errorMSG = "";
      this.successMSG = "";
    });
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
        runInAction(() => {
          if (json.success) {
            this.errorMSG = "";
            this.successMSG = "Sucessfully scanned business QR code!";
            this.business_document_id = json.found._id; // get mongoDB object id of document
            this.business_name = json.found.business_name; // get name of business
            this.address = json.found.address; // get human-readable address of business
            this.gps = json.found.gps; // get coordinates of business
            this.isLoading = false;
          } else {
            this.errorMSG = json.message;
            this.successMSG = "";
            this.isLoading = false;
          }
        });
      })
      .catch((err) => {
        runInAction(() => {
          this.errorMSG = err;
          this.successMSG = "";
          this.isLoading = false;
        });
      });
  };

  doCheckIn = () => {
    runInAction(() => {
      this.isLoading = true;
      this.errorMSG = "";
      this.successMSG = "";
    });
    fetch("http://localhost:5000/api/check-in/create-check-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.access_token}`,
      },
      body: JSON.stringify({
        business: this.business_document_id,
        dependant: this.dependants,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        runInAction(() => {
          if (json.success) {
            this.errorMSG = "";
            this.successMSG = "Succesfully checked in!";
            this.isLoading = false;
            this.checkedIn = true;
          } else {
            this.errorMSG = json.message;
            this.isLoading = false;
          }
        });
      })
      .catch((err) => {
        runInAction(() => {
          this.errorMSG = err;
          this.successMSG = "";
          this.isLoading = false;
        });
      });
  };

  doLogin = () => {
    runInAction(() => {
      this.isLoading = true;
      this.errorMSG = "";
    });
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
        runInAction(() => {
          if (json.success) {
            this.errorMSG = "";
            this.access_token = json.access_token; // store authentication/access token for allowing to stay signed in for a certain amount of time
            this.expires_in = json.expires_in; // store time in seconds before token expires
            this.roles = json.roles; // get a users roles, e.g. civilian, business etc.
            this.token_type = json.token_type;
            this.vaccination_certificate = json.vaccination_certificate;
            this.alerts = json.alerts;

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
      })
      .catch((err) => {
        runInAction(() => {
          this.errorMSG = err;
          this.isLoading = false;
        });
      });
  };

  doLogout = () => {
    this.isLoggedIn = false;
    this.resetState();
  };

  doSignUp = () => {
    runInAction(() => {
      this.isLoading = true;
      this.successMSG = "";
      this.errorMSG = "";
    });
    if (!validateEmail(this.email)) {
      this.errorMSG = "Email format is incorrect";
      this.isLoading = false;
      return;
    }

    const generateQR = async (business_id) => {
      try {
        const qr_code_url = await QRCode.toDataURL(business_id);
        signUpCallback(qr_code_url, business_id);
      } catch (err) {
        runInAction(() => {
          this.successMSG = "";
          this.errorMSG = err;
        });
      }
    };

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
          runInAction(() => {
            if (json.success) {
              this.resetState();
              this.errorMSG = "";
              this.successMSG = "Succesfully registered account!";
              this.isLoading = false;
            } else {
              this.errorMSG = json.message;
              this.successMSG = "";
              this.isLoading = false;
            }
          });
        })
        .catch((err) => {
          runInAction(() => {
            this.errorMSG = err;
            this.successMSG = "";
            this.isLoading = false;
          });
        });
    };

    // if signing up for a business account generate qr code then run business sign up method, else run user sign up method
    if (this.accType === "business") {
      const businessID = hash.sha256().update(this.email).digest("hex"); // email is hashed to provide a unique identifier for a qr code without revealing a business' email
      generateQR(businessID);
    }
    if (this.accType === "organisation") {
      const organisationID = hash.sha256().update(this.email).digest("hex"); // email is hashed to provide a unique identifier for a qr code without revealing a business' email
      signUpCallback(organisationID);
    } else {
      signUp();
    }

    // method used for user organisation sign up
    //TODO-Sam: check this part and add BE code please. ty -huy
    // const signUpCallback = (organisation_id) => {
    //   fetch("http://localhost:5000/api/auth/sign_up", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       role: this.accType,
    //       email: this.email,
    //       password: this.password,
    //       organisation_name: this.organisation_name,
    //       organisation_id: organisation_id,
    //     }),
    //   })
    //     .then((res) => res.json())
    //     .then((json) => {
    //       runInAction(() => {
    //         if (json.success) {
    //           this.resetState();
    //           this.errorMSG = "";
    //           this.successMSG = "Succesfully registered Organisation account!";
    //           this.isLoading = false;
    //         } else {
    //           this.errorMSG = json.message;
    //           this.successMSG = "";
    //           this.isLoading = false;
    //         }
    //       });
    //     })
    //     .catch((err) => {
    //       runInAction(() => {
    //         this.errorMSG = err;
    //         this.successMSG = "";
    //         this.isLoading = false;
    //       });
    //     });
    // };

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
          runInAction(() => {
            if (json.success) {
              this.resetState();
              this.errorMSG = "";
              this.successMSG = "Succesfully registered Business account!";
              this.isLoading = false;
            } else {
              this.errorMSG = json.message;
              this.successMSG = "";
              this.isLoading = false;
            }
          });
        })
        .catch((err) => {
          runInAction(() => {
            this.errorMSG = err;
            this.successMSG = "";
            this.isLoading = false;
          });
        });
    };
  };
}

// Utility
const validateEmail = (email) => {
  let re = /\S+@\S/;
  return re.test(email);
};

export const UserStore = new UserStoreImpl();
