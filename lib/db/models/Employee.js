import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: [true, "Please provide an employee ID"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: [100, "Name cannot be more than 100 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email",
    ],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please provide a phone number"],
  },
  department: {
    type: String,
    required: [true, "Please provide a department"],
  },
  position: {
    type: String,
    required: [true, "Please provide a position"],
  },
  joiningDate: {
    type: Date,
    required: [true, "Please provide a joining date"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Employee ||
  mongoose.model("Employee", EmployeeSchema);
