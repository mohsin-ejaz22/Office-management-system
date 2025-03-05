import { Router } from "express";
import EmployeeController from "./Controllers/EmployeeController.js";

const router = Router();

//for Employee
router.post("/create/employee", EmployeeController.createEmployee);
router.get("/get/employee", EmployeeController.getEmployees);
router.get("/get/employee/:id", EmployeeController.getEmployee);
router.put("/update/employee/:id",EmployeeController.updateEmployee);
router.delete("/delete/employee/:id", EmployeeController.deleteEmployee);
export default router;