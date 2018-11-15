import _ from 'lodash';
import { Patient } from './patient';

export const  objectToFhir = (obj): Object => {
  const patientData: any = {
    resourceType: "Patient",
  };
  const telecomData = [
    ...obj.telecom.emails.filter(t => t.value && t.system),
    ...obj.telecom.phones.filter(t => t.value && t.system)
  ];

  if (obj.firstName) {
    _.set(patientData, ['name', '0', 'given', '0'], obj.firstName);
  }

  if (obj.lastName) {
    _.set(patientData, ['name', '0', 'family'], obj.lastName);
  }

  if (obj.street) {
    _.set(patientData, ['address', '0', 'line', '0'], obj.street);
  }

  if (obj.state) {
    _.set(patientData, ['address', '0', 'state'], obj.state);
  }


  if (obj.city) {
    _.set(patientData, ['address', '0', 'city'], obj.city);
  }

  if (obj.zcode) {
    _.set(patientData, ['address', '0', 'postalCode'], obj.zcode);
  }

  if (telecomData.length > 0) {
    patientData.telecom = telecomData;
  }

  if (obj.birthDate) {
    patientData.birthDate = obj.birthDate;
  }
  if (obj.gender) {
    patientData.gender = obj.gender;
  }

  return patientData;
}

export const fhirToObject = (obj): Patient => {
  const patient = new Patient();
  patient.id = obj.id;
  patient.firstName = _.get(obj, ['name', '0', 'given', '0']);
  patient.lastName = _.get(obj, ['name', '0', 'family']);
  patient.street = _.get(obj, ['address', '0', 'line', '0']);
  patient.state = _.get(obj, ['address', '0', 'state']);
  patient.city = _.get(obj, ['address', '0', 'city']);
  patient.gender = obj.gender;
  patient.birthDate = obj.birthDate;
  patient.zcode = _.get(obj, ['address', '0', 'postalCode']);
  const emails = _.get(obj, 'telecom', []).filter(t => t.system === "email");
  const phones = _.get(obj, 'telecom', []).filter(t => t.system === "phone")

  patient.telecom = {
    emails: emails.length > 0 ? emails : [{ value: '', system: 'email'}],
    phones: phones.length > 0 ? phones : [{ value: '', system: 'phone'}]
  };
  return  patient;
}
