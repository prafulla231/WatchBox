import mongoose ,{Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
const videoSchema = new Schema({
    video_id:{
        type:string,
        required:true,
        unique:true,
        index:true
    },
    video_file:{
        type:string,
        required:true,
    },
    thumbnail:{
        type:string,
        required:true,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    title:{
        type:string,
        required:true,
        index:true
    },
    description:{
        type:string,
        required:true,
    },
    duration:{
        type:Number,
        required:true,
    },
   views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        // required:true,
        default:true
    },

},{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)
export const video = mongoose.model("video",videoSchema)