import S from "fluent-json-schema";

export const assignVechicleSchema = {
  body: S.object()
    .prop("bookingReference", S.string().required())
    .prop("vechicleId", S.integer().required())
    .prop("ownerId", S.integer().required())
    .prop("driverAssigned", S.integer().required()),
  queryString: S.object(),
  params: S.object(),
  headers: S.object(),
};
