# Tenmokenshi
## A multi-purpose Discord bot!
## I will be rewriting this project with Mongo as the DB!

This bot will no longer be maintained.
The new repo is https://github.com/Zyleaf/Tenmokenshi-Rewrite

![Tenmokenshi Logo](https://i.ibb.co/RCCRCB1/Tenmokenshi-Logo.png)

# Get started!
1. To get started, clone or download this repository!
2. Run npm install to install all the modules and their dependencies.
3. Create an .env file in the main directory.
4. Inside the .env file include these environment variables with your own keys! 

* BOT_TOKEN
* DB_HOST
* DB_USER
* DB_DATABASE
* TENOR_KEY
* TENOR_FILTER
* TENOR_LOCALE
* TENOR_MEDIA_FILTER
* TENOR_DATE_FORMAT
* TENOR_AR_RANGE
* OPENWEATHER_API_KEY
* WOLFRAMALPHA_API_KEY

# The MySQL database schema!
## Guild prefixes!
```sql
  CREATE TABLE guild_Prefixes (
    guild_id VARCHAR (20),
    guild_prefix CHAR (1)
  );
```

## User embed settings!
```sql
  CREATE TABLE user_Embed_Settings (
    user_id VARCHAR (20),
    user_embed_color VARCHAR (15) 
  );
```

## Guild Chat Channels [Global chat channels]!

```sql
  CREATE TABLE guild_Chat_Channels (
    guild_id VARCHAR (20),
    channel_id VARCHAR (20) 
  );
```

# If you need help or want to give feedback then, feel free to join the support server :)
[Tenmokenshi Support](https://discord.com/invite/m6Dnrk5)
