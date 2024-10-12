import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({ tableName: "users", timestamps: false })
export class Users extends Model<Users> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
    unique: {
      name: "user_id",
      msg: "User ID already exists",
    },
    validate: {
      isUUID: {
        args: 4,
        msg: "User ID must be a valid UUID",
      },
    },
  })
  user_id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  company_id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: {
      name: "email",
      msg: "Email address already exists",
    },
    validate: {
      isEmail: {
        msg: "Invalid email address",
      },
      notEmpty: {
        msg: "Email address cannot be empty",
      },
    },
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      is: {
        args: /^[a-zA-Z0-9]+$/,
        msg: "Password must contain only letters and numbers",
      },
      notEmpty: {
        msg: "Password cannot be empty",
      },
    },
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    validate: {
      is: {
        args: /^\d{10}$/,
        msg: "Phone number must be 10 digits",
      },
      notEmpty: {
        msg: "Phone number cannot be empty",
      },
    }
  })
  phone_number?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  address?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  city?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  state?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  country?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  postal_code?: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  signup_date!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  last_login?: Date;

  @Column({
    type: DataType.ENUM("active", "inactive"),
    allowNull: false,
    defaultValue: "active",
  })
  status!: "active" | "inactive";

  @Column({
    type: DataType.ENUM("customer", "admin"),
    allowNull: false,
    defaultValue: "customer",
  })
  user_role!: "customer" | "admin";
}
