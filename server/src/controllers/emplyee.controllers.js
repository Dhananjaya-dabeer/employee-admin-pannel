import Emplyee from "../modals/employee.modals.js"

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