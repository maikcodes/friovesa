import lang from "../../lang/es";

function isAddressFormEmpty({
  businessType = "",
  documentType = "",
  identification = "",
  name = "",
  lastName = "",
  address = "",
  sector = "",
  phone = "",
  email = "",
}) {
  return (
    !businessType ||
    !documentType ||
    !identification ||
    !name ||
    !lastName ||
    !address ||
    !sector ||
    !phone ||
    !email
  );
}
export function validateAddressFields({
  businessType = "",
  documentType = "",
  identification = "",
  name = "",
  lastName = "",
  address = "",
  addressStreet = "",
  sector = "",
  phone = "",
  email = "",
  addressLatitude = "",
  addressLongitude = "",
  additionalNotes = "",
}) {
  const sanitizedData = {
    businessType: businessType?.trim(),
    documentType: documentType?.trim(),
    identification: identification?.trim(),
    name: name?.trim(),
    lastName: lastName?.trim(),
    address: address?.trim(),
    addressStreet: addressStreet?.trim(),
    sector: sector?.trim(),
    phone: phone?.trim(),
    email: email?.trim(),
    addressLatitude: addressLatitude?.trim(),
    addressLongitude: addressLongitude?.trim(),
    additionalNotes: additionalNotes?.trim(),
  };

  if (isAddressFormEmpty(sanitizedData)) {
    throw new Error(lang?.pleaseInput);
  }
}
