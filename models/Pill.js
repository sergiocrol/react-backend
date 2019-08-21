const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const languages = require('../helpers/languages');

const ObjectId = Schema.Types.ObjectId;

const langArray = () => {
  const langArray = [];
  for (const lang in languages) {
    langArray.push(languages[lang].nativeName)
  }
  return langArray;
}

const lang = langArray();

const pillSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  fromLanguage: {
    type: String,
    enum: lang,
    default: 'English',
    required: true
  },
  toLanguage: {
    type: String,
    enum: lang,
    default: 'English',
    required: true
  },
  author: {
    type: ObjectId,
    ref: 'User'
  },
  date: {
    type: Date
  },
  rate: {
    type: Number
  },
  reviewers: {
    type: Number
  },
  difficulty: {
    type: Number,
    default: 1,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  topics: [
    {
      type: String,
      required: true
    }
  ],
  numberTaken: {
    type: Number,
    default: 0
  },
  numberOfCards: {
    type: Number,
    default: 1
  },
  cards: [
    {
      type: ObjectId,
      ref: 'Card'
    }
  ]
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
  });

const Pill = mongoose.model('Pill', pillSchema);

module.exports = Pill;