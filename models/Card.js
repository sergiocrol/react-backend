const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const cardSchema = new Schema({
  type: {
    type: String,
    enum: ["imageEasy", "imageHard", "soundEasy", "soundHard", "translationEasy", "translationHard", "fillEasy", "fillHard", "selection", "pairing"]
  },
  pillId: {
    type: ObjectId,
    ref: 'Pill'
  },
  images: [
    {
      imageUrl: {
        type: String
      },
      answer: [
        {
          type: String
        }
      ],
      incorrectAnswers: [
        {
          type: String
        }
      ]
    }
  ],
  sound: {
    soundUrl: {
      type: String
    },
    answer: [
      {
        type: String
      }
    ],
    incorrectAnswers: [
      {
        type: String
      }
    ]
  },
  sentence: {
    content: {
      type: String
    },
    answer: [
      {
        type: String
      }
    ],
    incorrectAnswers: [
      {
        type: String
      }
    ]
  },
  pairing: [
    {
      originalWord: {
        type: String
      },
      translatedWord: {
        type: String
      }
    }
  ]
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
  });

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;