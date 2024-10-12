import { Static, Type } from "@sinclair/typebox";
export const UserSchema = Type.Object({
  company_id: Type.String(),
  first_name: Type.String(),
  last_name: Type.String(),
  email: Type.String({ format: "email" }),
  password: Type.String(),
  phone_number: Type.Optional(Type.String()),
  address: Type.Optional(Type.String()),
  city: Type.Optional(Type.String()),
  state: Type.Optional(Type.String()),
  country: Type.Optional(Type.String()),
  postal_code: Type.Optional(Type.String()),
});

export const UserSchemaResponse = Type.Intersect([

  Type.Omit(UserSchema, ["password"]),
  Type.Object({
    user_id: Type.String(),
    status: Type.Enum({ active: "active", inactive: "inactive" }),
    last_login: Type.Optional(Type.String({ format: "date-time" })),
    user_role: Type.Enum({ customer: "customer", admin: "admin" }),
    signup_date: Type.String({ format: "date-time" }),
  }),
]);

export type UserSchemaType = Static<typeof UserSchema>;
