# FastOrderFood
This app designed for small sports comunities or small events where poeple stay in line to get food.
This app is super semple and easy to use.
it built on Express(Mongoose) and it based on cloud server.

# How to use the app
To order food you must log in with your Gmail then you be able to order.
1. Log in
2. Select from the Menu
3. Review your order
4. Pay and reciept
5. Give a review 


## Setup 

1. Clone the repo
2. Rename the folder to your Project
3. Delete the `.git` file, when you are in the root of the file, you can press `ls` and you should see a `.git` file, then go ahead and run `rm -rf .git`


#### Setup your git repo
1. in the project root `git init`
2. `git add .` to add all the starter code
3. `git commit -m "setup boilerplate"` 
4. go to github and create your github and create a repo (Without a readme or liscense you can add that later!)
5. copy the remote address
6. In your terminal add the remote `git remote add origin yourGithubRepo'sAddressGoesHere`
7. `git pull origin master` If a screen pulls up asking you to do something just press `:q` and then `enter` (thats vim btw :) )
8. `git push origin master`

#### Setup your login

0. Setup your database connection string
1. Then Setup Your User Model, 
2. Follow the steps from the lesson plan to get your Google login credentials for your `.env` file (create the file if you haven't), or you can just copy the ones from earlier if you want to reuse them.
3. Setup the Code in your config passport 
4. Setup your callback routes in your `routes/index`
5. Setup a view and test your login!

#### Make a commit 

```git commit -m "setup up oauth and User Model"```

![Screen Shot 2021-10-08 at 9 01 44 AM](https://user-images.githubusercontent.com/90425833/136588617-3328f343-8061-41dc-9d8e-7539bf220437.png)

![Screen Shot 2021-10-08 at 9 02 20 AM](https://user-images.githubusercontent.com/90425833/136588634-970ceccb-51b0-4f83-96e3-2d07b97747bd.png)
![Screen Shot 2021-10-08 at 9 03 16 AM](https://user-images.githubusercontent.com/90425833/136588641-2f5a9308-f7fa-4f77-affe-f6e5cf74f18e.png)
