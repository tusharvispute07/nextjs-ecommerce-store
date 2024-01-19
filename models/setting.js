import { Schema, model, models } from "mongoose"

const SettingSchema = new Schema({
    headerBanner: {type:String},
    salesBannerLeft: {type:String},
    salesBannerRight: {type:String}
},{
    timestamps:true,
})

SettingSchema.statics.getSingleton = async function () {
    let settings = await this.findOne();
    if (!settings) {
      settings = await this.create({});
    }
    return settings;
  };
  
export const Setting = models?.Setting || model('Setting', SettingSchema)
