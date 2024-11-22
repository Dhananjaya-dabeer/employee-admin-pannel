import Course from "../modals/course.modal.js"
import { errorHandler } from "../utils/error.js"



export const addCourse = async(req, res, next) => {
    try {
        const {course} = req.body
        if(!course){
            return next(errorHandler(400, "Course is required"));
        }
        const findDuplicate = await Course.findOne({course})
        if(findDuplicate){
            return next(errorHandler(400, "Course address already exists."));
        }
        await Course.create({
           course
        })
    
        return res.status(201).json({
            success: true,
            statusCode: 201,
            message: "Course created successfully!",
        });
    } catch (error) {
        next(error)
    }
}

export const getCourse = async(req, res, next) => {
    try {
        const employees = await Course.find()
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
export const EditCourse = async(req, res, next) => {
        try {
          const { id } = req.params
          const { course } = req.body
      
          if (!id) {
            return next(errorHandler(400, "Course ID is required"));
          }
      
          if (!course) {
            return res.status(400).json({
              success: false,
              statusCode: 400,
              message: "fill the input before adding"
            });
          }
      
          const updatedEmployee = await Course.findByIdAndUpdate(
            id,  
            {  course },  
            { new: true }  
          );
          if (!updatedEmployee) {
            return next(errorHandler(404, "Course not found"));
          }
      
          return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Course updated successfully!",
            data: updatedEmployee
          });
      
        } catch (error) {
          next(error);
        }
}

export const singleCourse = async(req, res, next) => {
    try {
        const {id} = req.params
        if(!id){
           return next(errorHandler(400, "Course ID is required"));
        }
        const data = await Course.findById(id)
        if(!data){
            return next(errorHandler(404, "Course not found!"))
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

export const deleteCourse = async (req, res, next) => {
    try {
        const {id} = req.params
        if(!id){
            return next(errorHandler(400, "Course ID is required"));
        }
        await Course.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Employee deleted successfully!",
          });
    } catch (error) {
        next(error)
    }
}