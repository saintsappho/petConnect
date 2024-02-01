### Tech Stack:

-PSQL,
-Express,
-React Spring && Vite,
-Node

Features:

Stretch Features:

User Stories:
- as a pet owner, I want to create and manage profiles for my pet.
- as a user, I want to record and track vaccinations for my pet.
- as a pet owner, I want to log daily activities, such as walks, meals, medicine, and playdates.

STRETCH:
- as a pet provider I want to integrate my services to reach a broader audience.


### Scrum Template:

- Group members: Tandra Malm @tmalm\_ , Robin Fleur @saintsappho, Dylan Palin @dylanpalin
- Project PetConnect:  
- What your team is working on today: 
- What was a struggle yesterday: 
- Est Project Completion:


# THE GOAL:

- Build a web app from start to finish using the tech and approaches learned to date
- Turn requirements into a working product
- Practice architecting an app in terms of UI/UX, Routes/API and Database
- Manage a multi-developer project with git
- Practice demoing an app to help prepare for the final project and employer interviews

### Functionality Requirements:

- Feed for pictures, statuses, videos.
- Posting, editing deleting posts
  - Picture, Posts, Text, Events. STRETCH: Forums, Polls. 
- Calendar Button Google/Apple calendar setting
- Data Rich Profiles
  - User / Pet
  


### Stretch Functionality:

- SPA (Single-Page Application) Behaviour (SEMI COMPLETE)

- Hosting, such as Railway.app, netlify, github pages, AWS, or Azure

# THE PLAN:

### MVD Features

- Registered users can create quizzes (COMPLETE)

  - constructive forms for creating quizzes (COMPLETE)
  - multiple choice forms and text forms available (COMPLETE)
  - privacy: users can make their quiz unlisted (url can be visited) (SEMI-COMPLETE)

- all users can attempt a quiz (COMPLETE)

  - users can see the results of their recent attempt (COMPLETE)
  - users can share a link to the result of their attempt // quiz/:id

- tumblr/pinterest style homepage/dashboard of all extant quizzes (COMPLETE)

  - users can share a link to a single quiz (COMPLETE)
  - users can see a list of public quizzes on the home page (COMPLETE)

- account locked edit and delete for quizzes

### Stretch Features

- search bar for public quizzes and users
- ajax the quizzes to remove scrolling (SPA behaviour i guess)
- like/share/report buttons
- quiz custom styles through SASS
- ai based quiz inspiration widget
- account profile pictures attached to quiz

### User Stories

- as a **\_\_\_\_** i can ****\_**** because **\_\_\_\_**
- as a **\_\_\_\_** this is what i want ****\_**** so that **\_\_\_\_**

- as a REGISTERED USER

  - i can make a quiz with many questions in different formats  
     --> because to attract users the app needs to be appealing to multiple individuals and their sensibilities

  - i can do anything an unregistered user can do  
     --> because we will only add more functionalities for registered Users

  - i can not see the link to register as a new user  
     --> because i am already a user

  - i can edit and delete my own quizzes but am unable to edit or delete quizzes by others  
     --> because login security is important

- as a NEW USER

  - i can take quizzes,  
     --> because to attract users the app needs to be flexible

  - i can share quizzes,  
     --> because to attract users the app needs to be flexible

  - i can share results,  
     --> because to attract users the app needs to be flexible

  - i can log in,  
     --> because to attract users the app needs to be flexible

  - i can register as a registered user  
     --> because to attract users the app needs to be flexible

### Be RESTFUL

- BROWSE: GET --> /quiz
- READ: GET --> /quiz/:id
- EDIT: POST --> /quiz/:id
- ADD: POST --> /quiz
- DELETE: POST --> /quiz/:id/delete
