import S from "fluent-json-schema";

export const createVechicleSchema = {
  body: S.object()
    .prop("ownerId", S.integer().required())
    .prop("brand", S.string().required())
    .prop("color", S.string().required())
    .prop("vechicleNumber", S.string().minLength(8).required()),
  queryString: S.object(),
  params: S.object(),
  headers: S.object(),
};
