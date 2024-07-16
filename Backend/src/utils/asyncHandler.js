const asyncHandler = (requestHandler)=>{
    (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err) =>next(err))
    }
}

export {asyncHandler}



/*
Using try catch block..higher order functions are used 
const asyncHandler = () =>{}
const asyncHandler = (func) => () => {}
const asyncHandler = async(func) => () => {} //this function is higher order function

*/
// This is wrapper function which we will use everywhere 
// const asyncHandler = (func) => async(req,res,next)=>{
//     try {
//         await func(req,res,next)
//     } catch (error) {
//         res.send( error.code || 500).json({
//             success:false,
//             message:error.message
//         })
//     }

//     }


