# Summoners

This is the archive repo for the project made in 48h for [React Riot 2018](https://www.reactriot.com/). Be warned that this project contains a lot of dirty hacks (like [this](https://github.com/rafaelalmeidatk/summoners/blob/master/pages/index.js#L29), [this](https://github.com/rafaelalmeidatk/summoners/blob/master/server/api.js#L18-L21), [this](https://github.com/rafaelalmeidatk/summoners/blob/master/components/SummonersFilter.js#L19-L33) and [this](https://github.com/rafaelalmeidatk/summoners/blob/master/pages/account.js#L17-L42)) that are not meant to be done in a real application.

![Screenshot](https://i.imgur.com/lI78Vsrl.png)

## Install and run locally

    yarn install
    yarn dev

Due the short time, this project uses a development Riot API Key that expires in 24 hours, so you won't be able to use features that require the key (like the summoner profile page or the LoL account integration) unless you provide your own [here](https://github.com/rafaelalmeidatk/summoners/blob/master/server/api.js#L7).