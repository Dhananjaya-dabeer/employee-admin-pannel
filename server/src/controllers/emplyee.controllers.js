import Emplyee from "../modals/employee.modals.js"
import { errorHandler } from "../utils/error.js"

export const newEmployee = async(req, res ,next) => {
  try {
      const { 
          name,
          email,
          mobile,
          designation,
          gender,
          course, 
          image
      } = req.body
  
      if(!name || !email || !mobile || !designation || !gender || !course || !image){
          return res.status(401).json({
              success: false,
              statusCode: 401,
              message: "Bad request! All fields are required!"
          })
      }
      const emailExists = await Emplyee.findOne({ email: req.body.email });
        if (emailExists) {
        return next(errorHandler(400, "Email address already exists."));
        }
       await Emplyee.create({
          name,
          email,
          mobile,
          designation,
          gender,
          course, 
          image
      })
  
      return res.status(201).json({
          success: true,
          statusCode: 201,
          message: "Employee created successfully!",
      });
  } catch (error) {
    next(error)
  }

}

export const getEmplyee = async(req, res, next) => {
   try {
     const employees = await Emplyee.find()
     if(employees.length === 0) {
         return res.status(200).json({
             success: true,
             statusCode: 200,
             message: "No emplyees found"
         })
     }
     return res.status(200).json({
         success: true,
         statusCode: 200,
         data: employees,
     })
   } catch (error) {
    next(error)
   }
}

export const singleEmployee = async(req, res, next) => {
   try {
     const {id} = req.params
     if(!id){
        return next(errorHandler(400, "Employee ID is required"));
     }
     const data = await Emplyee.findById(id)
     if(!data){
         return next(errorHandler(404, "Employee not found!"))
     }
 
     return res.status(200).json({
         success:true,
         statusCode: 200,
         data
     })
   } catch (error) {
    next(error)
   }
}

export const updateEmployee = async (req, res, next) => {
    try {
      const { id } = req.params
      const { name, email, mobile, designation, gender, course, image } = req.body
  
      if (!id) {
        return next(errorHandler(400, "Employee ID is required"));
      }
  
      if (!name || !email || !mobile || !designation || !gender || !course || !image) {
        return res.status(400).json({
          success: false,
          statusCode: 400,
          message: "All fields are required!"
        });
      }
  
      const updatedEmployee = await Emplyee.findByIdAndUpdate(
        id,  
        { name, email, mobile, designation, gender, course, image },  
        { new: true }  
      );
      if (!updatedEmployee) {
        return next(errorHandler(404, "Employee not found"));
      }
  
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Employee updated successfully!",
        data: updatedEmployee
      });
  
    } catch (error) {
      next(error);
    }
  };

  export const deleteEmployee = async(req, res, next) => {
    try {
        const { id } = req.params
        if (!id) {
            return next(errorHandler(400, "Employee ID is required"));
        }
        const deleteEmployee = await Emplyee.findByIdAndDelete(id)
        if (!deleteEmployee) {
            return next(errorHandler(404, "Employee not found"));
          }

          return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Employee deleted successfully!",
          });
    } catch (error) {
        next(error)
    }
  }