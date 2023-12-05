## Aniki

(Aniweb, Anichart)

What does it contain?
- list of anime
- anime details
- reviews
- favourite list
- watch list
- booksmarks

## MVP

### Models
  1. Admin\
    - username (displayed name)\
    - email\
    - password
  2. User\
    - username\
    - email\
    - password\
    - lists\
    - reviews??
  3. Anime\
    - name english\
    - name jpn\
    - date published\
    - status (ongoing, finished)\
    - description\
    - characters\
    - voice actors??\
    - reviews

### Backend 
  [ ] CRUD anime - admin\ 
  [ ] DELETE reviews - admin\
  [ ] READ anime - user\
  [ ] CRUD reviews - user\
  [ ] UPDATE favourite anime (list) - user
  

### Components
  - anime list
  - anime details
  - reviews
  - navbar
  - footer
  - header 


### Pages
  - homepage
  - anime list page
  - anime details page
  - favourites page
  - profile page
  - signup / login page // or dropdown in HP

## CSS
[ ] general look\
[ ] pages look\
[ ] components look


## Improvements
- responsive
- different lists (UPDATE operation)
- filter by genre
- search bar
- light / dark theme
- public / private lists


## Manga???
- mirrored page for manga





User
- email
- pw
- typeOfUser: {¨
    type: String,
    enum: ["standard", "admin"],
    default: "standard"
}


Anime
- nameEn: String
- nameJp: String
- publishDate
- reviews: [{
    author: ref. User
    description: String,
    rating: {¨
        type: Nymber,
        min: 1,
        max: 10
    }
    }]


