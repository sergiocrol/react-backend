const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const languages = require('../helpers/languages');
const gender = require('../helpers/gender')

const ObjectId = Schema.Types.ObjectId;

const langArray = () => {
  const langArray = [];
  for (const lang in languages) {
    langArray.push(languages[lang].nativeName)
  }
  return langArray;
}

const lang = langArray();

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  tagline: {
    type: String,
  },
  description: {
    type: String,
  },
  nativeLanguage: [
    {
      type: String,
      enum: lang,
      default: 'English'
    }
  ],
  spokenLanguages: [
    {
      lang: {
        type: String,
        enum: lang,
        default: 'English'
      },
      rate: {
        type: String
      }
    }
  ],
  learningLanguages: [
    {
      lang: {
        type: String,
        enum: lang,
        default: 'English'
      },
      rate: {
        type: String
      }
    }
  ],
  profileImage: {
    type: String,
    default: 'https://semantic-ui.com/images/avatar2/large/elyse.png'
  },
  images: [
    {
      type: String
    }
  ],
  age: {
    type: Date
  },
  location: {
    type: String
  },
  favoritePills: [
    {
      type: ObjectId,
      ref: 'Pill'
    }
  ],
  favoriteUsers: [
    {
      type: ObjectId,
      ref: 'User'
    }
  ],
  score: {
    type: Number,
    default: 0
  },
  createdPills: [
    {
      type: ObjectId,
      ref: 'Pill'
    }
  ],
  userReferences: [
    {
      userId: { type: ObjectId, ref: 'User' },
      message: { type: String }
    }
  ],
  gender: {
    type: String,
    enum: gender
  }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
  });

const User = mongoose.model('User', userSchema);

module.exports = User;