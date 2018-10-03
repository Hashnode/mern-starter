import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const happinessSchema = new Schema({
  individualhappiness: { type: 'Integer', required: true },
  teamhappiness: { type: 'Integer', required: true },
  teamid: {type: 'String', required: true},
  date: {type: 'Date',default: Date.now, required: true},
  cuid: {type: 'String', required: true},
});

export default mongoose.model('happiness', teamSchema);
