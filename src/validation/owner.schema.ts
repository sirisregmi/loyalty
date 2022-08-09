import S from "fluent-json-schema";

export const createOwnerSchema = {
  body: S.object()
    .prop("firstName", S.string().required())
    .prop("lastName", S.string().required())
    .prop("primaryPhone", S.string().required())
    .prop("secondayPhone", S.string())
    .prop("avatar", S.string())
    .prop("email", S.string().minLength(8).required()),
  queryString: S.object(),
  params: S.object(),
  headers: S.object(),
};
