class Eventonica {
  addEvent(name, description, category, date) {
    return new Event(name, description, category, date);
  }

  updateEvent(efindKey, efindValue, echangeKey, echangeValue) {
    let eventFound = allEvents.find(
      (e) => e[searchKeyChecker("event", efindKey)] == efindValue
    );

    if (eventFound != undefined) {
      eventFound[echangeKey] = echangeValue;
    } else {
      console.log("Updates failed. Event not found.");
    }
  }

  deleteEvent(efindKey, efindValue) {
    let eventFound = Event.allEvents.findIndex(
      (e) => e[searchKeyChecker("event", efindKey)] == efindValue
    );

    console.log(`Deleting event...
    Searching for: "${searchKeyChecker("event", efindKey)}"
    With Value:  ${efindValue}
    Event Found at Index: ${eventFound}
    Event: ${Event.allEvents[eventFound]}`); //TEST

    if (eventFound !== -1) {
      Event.allEvents.splice(eventFound, 1); //Deletes event

      let updateId = Event.allEvents.slice(eventFound); //Gets list of all events needing new id's
      updateId.forEach((e) => e.id--); //Updates all event id's
      Event._nextId--; //resets Id number
    } else {
      console.log("Deletion failed. Event not found.");
    }
  }

  findEventsByDate(checkDate) {
    let compDate1 = new Date(checkDate);
    compDate1 = compDate1.toDateString();

    console.log(`Searching by date...`); //TEST

    let searchResults = [];

    Event.allEvents.forEach((e) => {
      console.log(e.eventDate);
      let compDate2 = e.eventDate.toDateString();

      console.log(`Comparing dates...
        ${compDate1} | ${compDate2}`); //TEST

      if (compDate1 == compDate2) {
        searchResults.push(e);
      }
    });

    console.log(`Found: `); //TEST
    console.log(searchResults); //TEST

    return searchResults;
  }

  findEventsbyCategory(checkCat) {
    let compCat1 = checkCat;

    console.log(`Searching by category...`); //TEST

    let searchResults = [];

    Event.allEvents.forEach((e) => {
      console.log(e.eventDate);
      let compCat2 = e.eventCategory;

      console.log(`Comparing categories...
        ${compCat1} | ${compCat2}`); //TEST

      if (compCat1 == compCat2) {
        searchResults.push(e);
      }
    });

    console.log(`Found: `); //TEST
    console.log(searchResults); //TEST

    return searchResults;
  }

  addUser(newName, newPassword) {
    new User(newName, newPassword);
  }

  updateUser(ufindKey, ufindValue, uchangeKey, uchangeValue) {
    let userFound = User.allUsers.find(
      (u) => u[searchKeyChecker("user", ufindKey)] == ufindValue
    );

    if (userFound != -1) {
      userFound[uchangeKey] = uchangeValue;
    } else {
      console.log("Updates failed. User not found.");
    }
  }

  deleteUser(ufindKey, ufindValue) {
    let userFound = allUsers.findIndex(
      (u) => u[searchKeyChecker("user", ufindKey)] == ufindValue
    );

    console.log(`Deleting user...
    Searching for: "${searchKeyChecker("user", ufindKey)}"
    With Value:  ${ufindValue}
    User Found at Index: ${userFound}
    User: ${User.allUsers[userFound]}`); //TEST

    if (userFound != undefined) {
      allUsers.splice(userFound, 1); //Deletes user

      let updateId = allUsers.slice(userFound); //Gets list of all users needing new id's
      updateId.forEach((u) => u.id--); //Updates all user id's
      User._nextId--; //resets Id number
    } else {
      console.log("Deletion failed. User not found.");
    }
  }
}

class Event {
  static allEvents = [];
  static _nextId = 100;

  constructor(name, description, category, date) {
    this.id = Event._nextId++;
    this.eventName = name;
    this.eventDescription = description;
    this.eventCategory = category;
    this.eventDate = new Date(date);

    Event.allEvents.push(this); // keep track of all created instances
  }

  //SEARCH EVENTS BY DATE
  static findByDate(checkDate) {
    let compDate1 = checkDate.toDateString();

    dateReducer = function (acc, ind) {
      let compDate2 = ind.eventDate.toDateString();
      if (compDate1 == compDate2) {
        acc.push(ind);
      }
    };

    let searchResults = Event.allEvents.filter(dateReducer, []);

    return searchResults;
  }

  //SEARCH EVENTS BY CATEGORY
  static findByCategory(checkCat) {
    let compCat1 = checkCat;

    catReducer = function (acc, ind) {
      let compDate2 = ind.eventCategory;
      if (compCat1 == compCat2) {
        acc.push(ind);
      }
    };

    let searchResults = Event.allEvents.filter(catReducer, []);

    return searchResults;
  }
}

class User {
  static allUsers = [];
  static _nextId = 200;

  constructor(name, password) {
    this.id = User._nextId++;

    this.userName = name;
    this.userPassword = password;

    this.userFavorites = [];

    User.allUsers.push(this); // keep track of all created instances
  }
}

//Corrects search syntax
function searchKeyChecker(whichClass, check) {
  //console.log(`Checking search key...
  //whichClass: ${whichClass} | check: ${check}`); //TEST

  let trueKey = whichClass;

  switch (check) {
    case "id":
      //console.log(`Interpreted case: id... ${check}?`); //TEST
      trueKey = "id";
      break;

    case "name":
      //console.log(`Interpreted case: Name... ${check}?`); //TEST
      trueKey += "Name";
      break;

    default:
      break;
  }

  //console.log(`Got... ${trueKey}?`); //TEST

  return trueKey;
}