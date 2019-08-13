# Quick Compo

<br>

## Description

This app allows to registered users to create little courses (called from now "pills") in different languages which can be also taken by other users. The point of the app is invite people to share knowledge.

## User Stories

-  **404:** As an anon/registered user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can start creating pills or taking courses
-  **Login:** As a user I can login to the platform so that I can play competitions
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **Search pills** As a user I can search pills based on different fields
-  **List of pills** As a user I can see a list of pills based on a search query
-  **View of pill** As a user I can see a view with basic information about pill, such as: name, description, author, level or learning topics
-  **Take the course** As a user I can take the course
-  **View result of taken course** As a user I can see the result of the taken course
-  **Rate the taken course** As a user I can rate the taken pill
-  **Create new pill** As a user I can create a new pill, with all info I want to display to the user.
-  **See created pills** As a user I can see a list of pills I have created
-  **Edit created pill** As a user I can edit my own pills
-  **Delete created pill** As a user I can delete my own pills
-  **Profile** As a user I can see my profile
-  **Edit profile** As a user I can edit my profile, and add some information, such as: name, tagline, description, profile image, age, gender, location,                      images, learning laguages, spoken languages
-  **Statistics** As a user I can see an statistic page with my score and taken pills
-  **Favorites** As a user I can save a pill as favorite
-  **List of favorite pills** As a user I can see a list of favorite pills


## Backlog

- Add internationalization
- Add messaging system
- Add user search system
- Add different type of cards to create a variated pill


<br>


# Client / Frontend

## Routes
| Path                      | Component            | Permissions | Behavior                                                     |
| ------------------------- | -------------------- | ----------- | ------------------------------------------------------------ |
| `/`                       | Landing page         | anon        | Presentation page                                            |
| `/home`                   | Home page            | anon/user   | Home Page                                            |
| `/auth/signup`            | SignupPage           | anon        | Signup form, link to login, navigate to profile after signup |
| `/auth/login`             | LoginPage            | anon        | Login form, link to signup, navigate to homepage after login |
| `/auth/logout`            | n/a                  | anon        | Navigate to landing after logout, expire session             |
| `/profile`                | ProfilePage          | user        | Profile page with info about current user                    |
| `/profile/statistics`     | ProfileStatistics    | user        | Page with statistics about current user                      |
| `/pills`                  | SearchPill           | anon/user   | Page with result of search                                   |
| `/pills/:id`              | PillPage             | anon/user   | Page with the info about the pill                            |
| `/pills/:id/play`         | PillPlayPage         | user        | Page with the game                                           |
| `/pills/:id/result`       | PillResultPage       | user        | Page with the result of the page                             |
| `/pills/new`              | PillNewPage          | user        | Page with the info of the pill                               |
| `/pills/new/create`       | PillCreationPage     | user        | Page to start creating different cards for the pill          |
| `/pills/:id/edit`         | PillEditPage         | user        | Page to edit selected pill                                   |
| `/pills/:id/delete`       | PillDeletePage       | user        | Page to delete selected pill                                 |
| `/pills/created`          | PillsCreated         | user        | List of created pills, with a link to edit every pill        |
| `/favorites`              | FavoritePillsPage    | user        | List of favorite pills of user                               |


## Components

- LandingPage

- HomePage

- SignupPage

- LoginPage

- ProfilePage

- SearchPills

- PillPage

- PillPlayPage

- PillResultPage

- PillNewPage

- PillCreationPage

- PillEditPage

- PillDeletePage

- ProfileStatistics

- PillsCreated

- FavoritePillsPage

 

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()

- Pills Service
  - pill.getListOfPills()
  - pill.getOnePill(id)
  - pill.addOnePill(id)
  - pill.deleteOnePill(id)
  - pill.updateOnePill(id)


<br>


# Server / Backend


## Models

User model

```javascript
{
  name - String // required
  email - String // required & unique
  password - String // required
  tagline - String
  description - String 
  nativeLanguage - [{type: String, enum: [], default: 'English'}]
  spokenLanguages - [{lang:{type: String, enum: [], default: 'English'}, rate:{type: Number, default: 1} }]
  learningLanguages - [{lang:{type: String, enum: [], default: 'English'}, rate:{type: Number, default: 1} }]
  profileImage - {type: String, default: './images/defaultProfileImage.png'}
  images - [String]
  age - Date
  location - String
  favoritePills - [ObjectId<Pill>]
  favoriteUsers - [ObjectId<User>]
  score - {type: String, default: 0}
  createdPills - [ObjectId<Pill>]
  userReferences - [{userId:{type: OnjectId<User>}, message: {type: String}}]
  genre - {type: String, enum: []}
  isOnline - {type: Boolean, default: false}
  conversations - [ObjectId<Conversation>]
  lastConnection - Date
  completedPill - [ObjectId<Pill>]
}
```

Pill model

```javascript
 {
   name - String
   fromLanguage - {type: String, enum: []}
   toLanguage - {type: String, enum: []}
   author - ObjectId<User>
   date - Date,
   rate - Number,
   reviewers - Number,
   difficulty - {type: String, enum: []}
   description - String
   topics - [String]
   numberTaken - Number,
   numberOfCards - Number,
   cards - [ObjectId<Card>]
 }
```

Card model

```javascript
{
  type - {type: String, enum: []}
  pillId - ObjectId<Pill>
  images - [{imageUrl: String, answer: [{String}]}]
  sound - {soundUrl: String, answer: [{String}]}
  sentence - {content: String, answer: [{String}]}
  question - {content: String, possibleAnswer: [{String}], correctAnswer: String}
  pair - [{originalWord: String, translatedWord: String}]
}
```


<br>


## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ---------------------------------------
| GET         | /auth/me                    | Saved session                | 200            | 404          | Check if there is a user in session
| POST        | /auth/signup                | {name, email, password}      | 201            | 404          | Check if the user exists in the DB. If not, add to de DB and Save the user in session
| POST        | /auth/login                 | {email, password}            | 200            | 401          | Check if the user exists in the DB. Save the user in session.
| POST        | /auth/logout                | (empty)                      | 204            | 400          | Delete the session
| PUT         | /profile                    | {name, age, tagline...}      |                | 400          | Update the profile
| GET         | /profile                    | {id}                         |                |              | Get the profile info
| GET         | /pills                      | {fromLang, toLang, level }   | 201            | 400          | Get list of pills
| GET         | /pills/:id                  | {id}                         | 200            | 400          | Get one pill by id
| PUT         | /pills/:id/completed        | {id}                         | 201            | 400          | Update rate of pill and update score of user
| POST        | /pills/new                  | {name, fromLang, toLang}     |                | 400          | Add new pill
| PUT         | /pills/:id/edit             | {name, fromLang, toLang}     |                |              | Edit one pill
| DELETE      | /pills/:id/delete           | {id}                         | 200            | 404          | Delete one pill
| GET         | /favorites                  | {id}                         |                |              | Get a list of favorites

<br>


## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/QWW8Vi3x/react-app) 
or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/screeeen/project-client)

[Server repository Link](https://github.com/screeeen/project-server)

[Deployed App Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
