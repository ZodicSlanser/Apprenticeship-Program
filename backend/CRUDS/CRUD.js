import {
  commit,
  getApprenticeship,
  getAllApprenticeships,
  removeFromDB,
  uploadToFireStore,
  updateInDB,
} from "./CRUD_OP.js";
import { apprenticeshipSchema } from "../Firebase/Validation/ValidationSchema.js";
import { Apprenticeship } from "../Firebase/Models/Apprenticeship.js";
import { Role } from "../Firebase/Models/Role.js";
import { TeamMember } from "../Firebase/Models/TeamMember.js";

//Create, Read, Update, Delete  --> Apprenticeship

//POST Apprenticeship to DB
//Apprenticeship object => bool
async function AddApprenticeship(apprenticeship) {
  const validationResult = apprenticeshipSchema.validate(apprenticeship, {
    abortEarly: true,
  });
  //TODO: upload files
  const logoRes = await uploadToFireStore(apprenticeship.logo,apprenticeship.id+"_logo","png");
  const videoRes  await uploadToFireStore(apprenticeship.introVideo,apprenticeship.id+"_logo","mp4");
  apprenticeship.logo = logoRes;
  apprenticeship.introVideo = videoRes;
  apprenticeship.members.map((member) => {
    const memberRes = await uploadToFireStore(member.image,apprenticeship.id+"_logo","png");
    member.image = memberRes;
  }
  apprenticeship.roles = apprenticeship.roles.map((role) => {
    return { ...new Role(role) };
  });
  apprenticeship.members = apprenticeship.members.map((member) => {
    return { ...new TeamMember(member) };
  });
  return await commit(apprenticeship);
}

//GET DB to API
//int ID => Apprenticeship object / null
function ViewApprenticeship(ID = null) {
  return ID != null ? getApprenticeship(ID) : getAllApprenticeships();
}

//POST API -> DB
//int ID => bool
function DeleteApprenticeship(ID) {
  //TODO : 1- Validation
  getApprenticeship(ID)
    .then((apprenticeship) => {
      if (apprenticeship == null) return false;
      removeFromDB(ID)
        .then(() => {
          return true;
        })
        .catch((error) => {
          console.log(error);
          return false;
        });
    })
    .catch(() => {
      return false;
    });
}

//POST API -> DB
//old Apprenticeship ID, New Apprenticeship Object => bool
function UpdateApprenticeship(apprenticeship) {
  apprenticeship = Object.values(apprenticeship)[0];
  const isValid = apprenticeshipSchema.validate(apprenticeship, {
    abortEarly: true,
  });
  if (isValid.error) {
    console.log(isValid.error);
    return isValid.error;
  }
  return updateInDB(apprenticeship, null, null);
}

//Create, Read, Update, Delete --> Fields

//Add Field value to Apprenticeship Object.
//Field Name, Value, Apprenticeship object => bool
function AddValue(fieldName, value, apprenticeship) {
  // 1- Validate FieldName
  // 2- Validate Value
  // 3- Add to Apprenticeship object
  const isValid = apprenticeshipSchema.validate(apprenticeship, {
    abortEarly: true,
  });
  if (isValid.error) {
    console.log(isValid.error);
    return isValid.error;
  }
  return updateInDB(apprenticeship.id, fieldName, value);
}

//POST Delete field from Apprenticeship Document
//Apprenticeship ID, Field => Bool
async function DeleteField(ID, fieldName) {
  const app = await getApprenticeship(ID);
  if (app == null) return false;
  return removeFromDB(ID, fieldName);
}

function uploadFile(filePath) {
  uploadToFireStore(filePath).catch((error) => {
    console.log(error);
    return false;
  });
}

export {
  AddApprenticeship,
  ViewApprenticeship,
  DeleteApprenticeship,
  UpdateApprenticeship,
  AddValue,
  DeleteField,
  uploadFile,
};
