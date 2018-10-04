import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const happinessSchema = new Schema({
  individualhappiness: { type: 'Number', required: true },
  teamhappiness: { type: 'Number', required: true },
  teamid: { type: 'String', required: true },
  date: { type: 'Date', default: Date.now, required: true },
  cuid: { type: 'String', required: true },
});

export default mongoose.model('happiness', happinessSchema);
