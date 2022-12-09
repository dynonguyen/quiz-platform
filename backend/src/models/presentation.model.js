const mongoose = require('mongoose');
const { MAX } = require('~/constant');
const Schema = mongoose.Schema;

// -----------------------------
const slideOptionSchema = new Schema({
  label: { type: String, required: true, trim: true, unique: true },
  value: { type: String, required: true, trim: true, unique: true },
  photo: String,
  isCorrect: { type: Boolean, default: false },
  order: { type: Number, default: 1 },
});

const slideSettingSchema = new Schema({
  chartType: { type: String, default: 'bar' },
  showCorrectAnswer: { type: Boolean, default: false },
  showPercentage: { type: Boolean, default: false },
  multipleChoice: { type: Number, default: 1 },
});

const slideAnswerSchema = new Schema({
  // userId or ip to detect user
  userId: { type: String, required: true, unique: true },
  // Map to value in slide options
  answers: [{ type: String, required: true, trim: true, unique: true }],
});

const slideSchema = new Schema({
  id: { type: String, required: true, unique: true, trim: true },
  type: { type: String, required: true },
  question: {
    type: String,
    required: true,
    trim: true,
    maxLength: MAX.SLIDE_NAME,
  },
  desc: {
    type: String,
    trim: true,
    maxLength: MAX.SLIDE_DESC,
  },
  options: { type: [slideOptionSchema], default: [] },
  settings: slideSettingSchema,
  answers: { type: [slideAnswerSchema], default: [] },
});

// -----------------------------
const presentationSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: MAX.PRESENTATION_NAME,
    },
    desc: { type: String, trim: true, maxLength: MAX.PRESENTATION_DESC },
    code: {
      type: String,
      trim: true,
      required: true,
      maxLength: MAX.PRESENTATION_CODE,
    },
    owner: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    slides: { type: [slideSchema], default: [] },
    isPresenting: { type: Boolean, default: false },
    // slide is being shown
    currentSlide: { type: String, default: '' },
    onlineCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const PresentationModel = mongoose.model(
  'presentation',
  presentationSchema,
  'presentation',
);

module.exports = PresentationModel;
