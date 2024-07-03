# Functional Requirements
- [x] Should be able to sign up
- [x] Should be able to authenticate
- [x] Should be able to fetch a user's profile
- [ ] Should be able to display user check in number
- [ ] Should be able to let user keep track of their check in history
- [ ] Should be able to find nearby gyms
- [ ] Should be able to search for gyms by name
- [ ] Should be able to let user check in
- [ ] Should be able to validate user check in
- [ ] Should be able to sign a new gym up

# Business Rules
- [x] User should not be able to sign up with pre-registered email
- [ ] User can't check in twice in the same day
- [ ] User can't check in if far (100m+) from the gym
- [ ] Check ins can only be validated up to 20 minutes after creation
- [ ] Check in can only be validated by admins
- [ ] Gyms can only be added by admins

# Non functional requirements
- [x] User passwords need to be encrypted
- [x] Application data must be stored in a PostgreSQL database
- [ ] All data lists need to be paginated with 20 items per page
- [ ] User must be identified by JWT (JSON Web Token)
