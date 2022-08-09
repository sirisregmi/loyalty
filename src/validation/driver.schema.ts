import S from "fluent-json-schema";

export const createDriverSchema = {
  body: S.object()
    .prop("firstName", S.string().required())
    .prop("lastName", S.string().required())
    .prop("primaryPhoneNum", S.string().required())
    .prop("licenseNumber", S.string().required())
    .prop("secondaryPhoneNum", S.string())
    .prop("ownerId", S.integer().required()),
  queryString: S.object(),
  params: S.object(),
  headers: S.object(),
};

export const driverByOwnerSchema = {
  queryString: S.object().prop("ownerId", S.integer().required()),
};
