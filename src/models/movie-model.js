import { Schema, model, Types, Query} from "mongoose"


const MovieSchema = new Schema({
  creator: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  description: String,
  language: String,
  release_year: String,
  dateCreated: {
    type: Date,
    default: Date.now
  },

  }) 

MovieSchema.pre(/^find/, function (next){
if (this instanceof Query) {
    this.where({ isDeleted: { $ne: true } }); 
  }  
  next()
})


export default model('Movie', MovieSchema)