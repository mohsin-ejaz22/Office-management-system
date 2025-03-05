import Employee from "../models/EmployeeModel.js";
import { ObjectId } from "mongodb";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  async createEmployee(req, res) {
    try {
      const {
        employeefirstname,
        employeelastname,
        employeegender,
        employeemobileno,
        employeeemail,
        employeerole,
        employeedepartment,
        employeedob
      } = req.body;

      const employeefile = req.files ? req.files.employeefile : null;
      const employeeimage = req.files ? req.files.employeeimage : null;

      const filePath = employeefile
        ? `uploads/${Date.now()}${path.extname(employeefile.name)}`
        : null;

      const imagePath = employeeimage
        ? `uploads/${Date.now()}${path.extname(employeeimage.name)}`
        : null;

      const newEmployee = new Employee({
        employeefirstname,
        employeelastname,
        employeegender,
        employeemobileno,
        employeeemail,
        employeerole,
        employeedepartment,
        employeedob,
        employeefile: filePath,
        employeeimage: imagePath,
      });

      await newEmployee.save();

      if (employeefile) {
        await employeefile.mv(filePath);
      }
      if (employeeimage) {
        await employeeimage.mv(imagePath);
      }

      return res.status(201).json(newEmployee);
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map(err => ({
          msg: err.message,
          path: err.path,
        }));
        return res.status(400).json({ errors });
      }
      return res.status(500).json({ error: error.message });
    }
  },

  async getEmployees(req, res) {
    try {
      const employees = await Employee.find({});
      return res.json({ data: employees });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getEmployee(req, res) {
    try {
      const employeeId = req.params.id;
      if (!ObjectId.isValid(employeeId)) {
        return res.status(400).json({ message: "Invalid Employee ID" });
      }

      const employee = await Employee.findById(employeeId);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      return res.status(200).json(employee);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async updateEmployee(req, res) {
    try {
      const employeeId = req.params.id;
      if (!ObjectId.isValid(employeeId)) {
        return res.status(400).json({ message: "Invalid Employee ID" });
      }

      const existingEmployee = await Employee.findById(employeeId);
      if (!existingEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      const {
        employeefirstname,
        employeelastname,
        employeegender,
        employeemobileno,
        employeeemail,
        employeerole,
        employeedepartment,
        employeedob,
      } = req.body;

      const employeefile = req.files ? req.files.employeefile : null;
      const employeeimage = req.files ? req.files.employeeimage : null;

      if (employeefile) {
        if (existingEmployee.employeefile) {
          await fs.unlink(path.join(__dirname, "..", existingEmployee.employeefile));
        }
        existingEmployee.employeefile = `uploads/${Date.now()}${path.extname(employeefile.name)}`;
        await employeefile.mv(existingEmployee.employeefile);
      }

      if (employeeimage) {
        if (existingEmployee.employeeimage) {
          await fs.unlink(path.join(__dirname, "..", existingEmployee.employeeimage));
        }
        existingEmployee.employeeimage = `uploads/${Date.now()}${path.extname(employeeimage.name)}`;
        await employeeimage.mv(existingEmployee.employeeimage);
      }

      existingEmployee.employeefirstname = employeefirstname;
      existingEmployee.employeelastname = employeelastname;
      existingEmployee.employeegender = employeegender;
      existingEmployee.employeemobileno = employeemobileno;
      existingEmployee.employeeemail = employeeemail;
      existingEmployee.employeerole = employeerole;
      existingEmployee.employeedepartment = employeedepartment;
      existingEmployee.employeedob = employeedob;

      await existingEmployee.save();
      return res.status(200).json({ message: "Employee updated successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },


  async deleteEmployee(req, res) {
    try {
      const employeeId = req.params.id;
      if (!ObjectId.isValid(employeeId)) {
        return res.status(400).json({ message: "Invalid Employee ID" });
      }

      const existingEmployee = await Employee.findById(employeeId);
      if (!existingEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      if (existingEmployee.employeefile) {
        await fs.unlink(path.join(__dirname, "..", existingEmployee.employeefile));
      }

      if (existingEmployee.employeeimage) {
        await fs.unlink(path.join(__dirname, "..", existingEmployee.employeeimage));
      }

      await Employee.findByIdAndDelete(employeeId);
      return res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
