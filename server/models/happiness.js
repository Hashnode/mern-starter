import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const happinessSchema = new Schema({
  individualhappiness: { type: 'String', required: true },
  teamhappiness: { type: 'String', required: true },
  
});

export default mongoose.model('happiness', teamSchema);
