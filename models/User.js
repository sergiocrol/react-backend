const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import languages from '../helpers/languages.json';
import gender from '../helpers/gender.json';

const ObjectId = Schema.Types.ObjectId;

const langArray = () => {
  const langArray = [];
  for (const lang in languages) {
    langArray.push(languages[lang].nativeName)
  }
  return langArray;
}

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
      enum: [langArray()],
      default: 'English'
    }
  ],
  spokenLanguages: [
    {
      lang: {
        type: String,
        enum: [langArray()],
        default: 'English'
      },
      rate: {
        type: Number,
        default: 1
      }
    }
  ],
  learningLanguages: [
    {
      lang: {
        type: String,
        enum: [langArray()],
        default: 'English'
      },
      rate: {
        type: Number,
        default: 1
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
    enum: [gender]
  }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
  });

const User = mongoose.model('User', userSchema);

module.exports = User;