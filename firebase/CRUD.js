//TODO: 1- Add,Update,Delete,View --> Apprenticeship
import { commit, getApprenticeship, removeFromDB, updateInDB } from "./CRUD_OP.js";
const hasOwn = Object.prototype.hasOwnProperty;
import { apprenticeshipSchema } from "../validation/validationSchema.js";
import { Apprenticeship } from "./Collections/Apprenticeship.js";

//POST Apprenticeship to DB
//Apprenticeship object => bool
function AddApprenticeship(apprenticeship) {
  //TODO: 1- Validation
  //ValidateApprenticeship(apprenticeship) : Bool
  //TODO: 2- Add to DB
  //Commit(apprenticeship) : void
  apprenticeshipSchema.validateAsync(apprenticeship).then(() => {
    return commit(apprenticeship);
  }
  ).catch((err) => {
    console.log(err);
    return false;
  }
  );

}

//GET DB to API
//int ID => Apprenticeship object / null
function ViewApprenticeship(ID) {
  //TODO: 1- Validation
  //ValidateApprenticeship()
  //TODO: 2- return from DB
  //returnApprenticeship()
  getApprenticeship(ID).then(async (apprenticeship) => {
    try {
      await apprenticeshipSchema.validateAsync(apprenticeship);
      return new Apprenticeship(apprenticeship);
    } catch (err) {
      console.log(err);
      return null;
    }
  }).catch((error) => {
    console.log(error);
    return null;
  });
}

//POST API -> DB
//int ID => bool
function DeleteApprenticeship(ID) {
  //TODO: 1- Validation
  //ValidateApprenticeship()
  //Delete Apprenticeship from DB and return true
  removeFromDB(ID).then(() => {
    return true;
  }).catch((error) => {
    console.log(error);
    return false;
  });
  //Delete()
  //false
}

//POST API -> DB
//old Apprenticeship ID, New Apprenticeship Object => bool
function UpdateApprenticeship(apprenticeship) {
  //TODO: 1- Validation
  //ValidateApprenticeship()
  updateInDB(apprenticeship.id, null, { ...apprenticeship }).then(() => {
    return true;
  }).catch((error) => {
    console.log(error);
    return false;
  });
  //TODO 2- Update Document by ID
  //updateInDB()
}

//TODO: 2- Add,Update,Delete,View --> Fields

//Add Field value to Apprenticeship Object.
//Field Name, Value, Apprenticeship object => bool
function AddValue(fieldName, value, apprenticeship) {
  //TODO 1- Validate FieldName
  //ValidateField() -> Bool
  apprenticeshipSchema.validateAsync(apprenticeship).then(() => {
    return updateInDB(apprenticeship.id, fieldName, value);
  }
  ).catch((err) => {
    console.log(err);
    return false;
  }
  );
  //TODO 2- Validate Value
  //ValidateValue() => bool
  //TODO 3- Add to Apprenticeship object
  //updateInDB() => bool

}

//POST Update Value in Apprenticeship Document
//Field Name, Value, Apprenticeship ID => bool
function UpdateField(ID, fieldName, value) {
  //TODO 1- Validate FieldName
  //ValidateField() -> Bool
  //TODO 2- Validate Value
  //ValidateValue() => bool
  //TODO 3- Validate Apprenticeship
  //ValidateApprenticeship() => bool
  //TODO 4- replace value in firebase
  //updateInDB() =>
  return updateInDB(ID, fieldName, value).then(() => {
    return true;
  }).catch((error) => {
    console.log(error);
    return false;
  }
  );
}

//POST Delete field from Apprenticeship Document
//Apprenticeship ID, Field => Bool
function DeleteField(ID, fieldName) {
  //TODO 1- Validate FieldName
  //ValidateField() -> bool
  //TODO 2- Validate Apprenticeship
  //ValidateApprenticeship() => bool
  //TODO 3- Delete field from Apprenticeship Document
  //removeFromDB() => bool
  return removeFromDB(ID, fieldName);
}
export { AddApprenticeship, ViewApprenticeship, DeleteApprenticeship, UpdateApprenticeship, AddValue, UpdateField, DeleteField };