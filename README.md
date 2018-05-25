# Dojo Sort APP
An app to sort dojo members

## Install
```
yarn install
```

## Before running
You must create a .env file from .env.sample. The SLACK_URL param is the slack webhook uri, and the API_URL param is used to serve the JSON with host and members of dojo

JSON example:
```
{
  "hostList": {
    "21": [
      "Gente 1",
      "Gente 2"
    ],
    "22": [
      "Gente 3",
      "Gente 4"
    ]
  },
  "memberList": [
    "Gente 1",
    "Gente 2",
    "Gente 3",
    "Gente 4"
  ]
}
```

Before create a new host, you have to be sure that it's index is correct. This index is related to week's number, (ex 25/05/2018 was week 21)
The system automatically gets the week number.

## Running
I recommend you to set a cronjob to run the application. The command to be ran is the following:

```
node index.js send
```
where `send` is a parameter used to control if the message should be sent to slack or not

Actual DOJO config:
https://gist.github.com/JoaoBGusmao/24dac2d62e898e944301472e52df8d27
