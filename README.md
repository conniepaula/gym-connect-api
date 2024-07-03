# Functional Requirements
- [x] Should be able to sign up
- [x] Should be able to authenticate
- [x] Should be able to fetch a user's profile
- [x] Should be able to get user check in number
- [x] Should be able to let user keep track of their check in history
- [ ] Should be able to find nearby gyms
- [ ] Should be able to search for gyms by name
- [x] Should be able to let user check in
- [ ] Should be able to validate user check in
- [x] Should be able to sign a new gym up

# Business Rules
- [x] User should not be able to sign up with pre-registered email
- [x] User can't check in twice in the same day
- [x] User can't check in if far (250m+) from the gym
- [ ] Check ins can only be validated up to 20 minutes after creation
- [ ] Check in can only be validated by admins
- [ ] Gyms can only be added by admins

# Non functional requirements
- [x] User passwords need to be encrypted
- [x] Application data must be stored in a PostgreSQL database
- [x] All data lists need to be paginated with 20 items per page
- [ ] User must be identified by JWT (JSON Web Token)
