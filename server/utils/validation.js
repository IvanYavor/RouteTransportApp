const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const {
  statusEnum,
  transportStatusEnum,
  transportTypeEnum,
} = require("./constants");

const validateCity = (city) => {
  return typeof city === "string" && city.length > 0 && city.length < 30;
};

const validateNumber = (num) => {
  return typeof num === "number" && num > 0;
};

const validateDate = (date) => {
  var dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return false;
  }
  return true;
};

const validateId = (id) => {
  return ObjectId.isValid(id);
};

const validateValueInEnum = (enumeration, value) => {
  return enumeration.includes(value);
};

const validateNumberPlate = (plate) => {
  const plateRegex = /^[A-Z0-9]{1,10}$/;
  if (!plateRegex.test(plate)) {
    return false;
  }
  return true;
};

const validateModel = (model) => {
  return typeof model === "string" && model.length > 0;
};

const createRouteValidate = (data) => {
  const {
    startCity,
    endCity,
    distance,
    dispatchDate,
    executionDate,
    transportType,
    expectedPay,
    transportId,
    status,
  } = data;

  if (!validateCity(startCity) || !validateCity(endCity)) {
    return false;
  }

  if (!validateNumber(distance)) return false;

  if (!validateDate(executionDate) || !validateDate(dispatchDate)) return false;

  if (!validateId(transportId)) return false;

  if (!validateNumber(expectedPay)) return false;

  if (
    !validateValueInEnum(transportTypeEnum, transportType) ||
    !validateValueInEnum(statusEnum, status)
  )
    return false;

  return true;
};

const updateRouteValidate = (data) => {
  const {
    startCity,
    endCity,
    distance,
    dispatchDate,
    executionDate,
    transportType,
    expectedPay,
    transportId,
    status,
  } = data;

  if (
    (startCity && !validateCity(startCity)) ||
    (endCity && !validateCity(endCity))
  ) {
    return false;
  }

  if (distance && !validateNumber(distance)) return false;

  if (
    (executionDate && !validateDate(executionDate)) ||
    (dispatchDate && !validateDate(dispatchDate))
  )
    return false;

  if (transportId && !validateId(transportId)) return false;

  if (expectedPay && !validateNumber(expectedPay)) return false;

  if (
    (transportType && !validateValueInEnum(transportTypeEnum, transportType)) ||
    (status && !validateValueInEnum(statusEnum, status))
  )
    return false;

  return true;
};

const createTransportValidate = (data) => {
  const { plateNumber, status, model, purchaseDate, mileage, type } = data;

  if (!validateNumberPlate(plateNumber)) return false;

  if (!validateValueInEnum(transportStatusEnum, status)) return false;

  if (!validateModel(model)) return false;

  if (!validateDate(purchaseDate)) return false;

  if (!validateNumber(mileage)) return false;

  if (!validateValueInEnum(transportTypeEnum, type)) return false;

  return true;
};

const updateTransportValidate = (data) => {
  const { plateNumber, status, model, purchaseDate, mileage, type } = data;

  if (plateNumber && !validateNumberPlate(plateNumber)) return false;

  if (status && !validateValueInEnum(transportStatusEnum, status)) return false;

  if (model && !validateModel(model)) return false;

  if (purchaseDate && !validateDate(purchaseDate)) return false;

  if (mileage && !validateNumber(mileage)) return false;

  if (type && !validateValueInEnum(transportTypeEnum, type)) return false;

  return true;
};

module.exports = {
  createRouteValidate,
  createTransportValidate,
  updateRouteValidate,
  updateTransportValidate,
  validateId,
};
