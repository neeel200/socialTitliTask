const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
    
      flatNo: String,
      floorNo: String,
      wing:{
        type:String,
        enum:["C", "A", "B", "D"]
      },
      landmark: String,
      pincode: Number,
      city: String,
      State: String
    },
    emailId: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    agreementValue: {
      type: Number,
      required: true,
    },
    receivedAmount: {
      type: Number,
      required: true,
    },
    landAreaDetails: {
      reraCarpetAreainSqFt: {
        type: Number,
        required: true,
      },
      BalconyAreaSqFt: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const userModel = model("users", userSchema);


module.exports = userModel;
